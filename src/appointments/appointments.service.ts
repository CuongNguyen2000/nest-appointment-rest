import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Appointment } from '@prisma/client';
import { createApptDTO } from './dto/createAppt.dto';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';
import {
    UserNotFoundException,
    ApptNotFoundException,
} from '../exceptions/NotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) { }

    // Get a single appointment
    async appointment(id: number): Promise<Appointment> {
        const appt = await this.prisma.appointment.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true, // Return all fields
            },
        });

        if (!appt) throw new ApptNotFoundException(id);

        return appt;
    }

    //get list appointment by user
    async appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]> {
        const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: parseInt(filter.user),
            },
        });

        if (!userExist) throw new UserNotFoundException(parseInt(filter.user));

        const startDate = new Date(Date.parse(filter.start_date));
        const endDate = new Date(Date.parse(filter.end_date));

        if (Date.parse(filter.start_date) < today.valueOf()) {
            throw new HttpException(
                'Start date must be greater than today',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (Date.parse(filter.start_date) > Date.parse(filter.end_date)) {
            throw new HttpException(
                'End date must be greater than start date',
                HttpStatus.BAD_REQUEST,
            );
        }

        const appointments = await this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: parseInt(filter.user) },
                    {
                        start_date: {
                            gte: startDate,
                        },
                    },
                    {
                        end_date: {
                            lte: endDate,
                        },
                    },
                ],
            },
            include: {
                user: true, // Return all fields
            },
        });

        return appointments;
    }

    // Create an appointment
    async createAppt(input: createApptDTO): Promise<Appointment> {
        const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: input.user,
            },
        });

        if (!userExist) throw new UserNotFoundException(input.user);

        if (Date.parse(input.start_date) < today.valueOf()) {
            throw new HttpException(
                'Start date must be greater than today',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (Date.parse(input.start_date) > Date.parse(input.end_date)) {
            throw new HttpException(
                'End date must be greater than start date',
                HttpStatus.BAD_REQUEST,
            );
        }

        console.log(Date.parse(input.start_date));
        console.log(Date.parse(input.end_date));

        const newAppt = await this.prisma.appointment.create({
            data: {
                ...input,
                user: {
                    connect: {
                        id: userExist.id,
                    },
                },
            },
            include: {
                user: true, // Return all fields
            },
        });
        return newAppt;
    }

    // Update an appointment
    async updateAppt(id: number, params: updateApptDTO): Promise<Appointment> {
        const { start_date, end_date } = params;
        const today = new Date();

        if (Date.parse(start_date) < today.valueOf()) {
            throw new HttpException(
                'Start date must be greater than today',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (Date.parse(start_date) > Date.parse(end_date)) {
            throw new HttpException(
                'End date must be greater than start date',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const updateAppt = await this.prisma.appointment.update({
                where: {
                    id: id,
                },
                data: {
                    ...(start_date && { start_date }),
                    ...(end_date && { end_date }),
                },
                include: {
                    user: true, // Return all fields
                },
            });

            return updateAppt;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new ApptNotFoundException(id);
            }
            throw error;
        }
    }

    // delete an appointment
    async deleteAppt(id: number): Promise<Appointment> {
        try {
            const deleteAppt = await this.prisma.appointment.delete({
                where: {
                    id: id,
                },
                include: {
                    user: true, // Return all fields
                },
            });
            return deleteAppt;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new ApptNotFoundException(id);
            }
            throw error;
        }
    }
}
