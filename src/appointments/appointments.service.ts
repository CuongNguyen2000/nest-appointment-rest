import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
import { LoggerService } from './../logger/logger.service';

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) {}
    private readonly logger: LoggerService = new Logger(
        AppointmentsService.name,
    );

    // Get a single appointment
    async appointment(id: number): Promise<Appointment> {
        const appt = await this.prisma.appointment.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!appt) {
            this.logger.warn(
                'Tried to access an appointment that does not exist',
            );
            throw new ApptNotFoundException(id);
        }

        return appt;
    }

    //get list appointment by user
    async appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]> {
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: parseInt(filter.user),
            },
        });

        if (!userExist) {
            this.logger.warn('Tried to access an user that does not exist');
            throw new UserNotFoundException(parseInt(filter.user));
        }

        const startDate = new Date(Date.parse(filter.timeFrom));
        const endDate = new Date(Date.parse(filter.timeTo));

        return this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: parseInt(filter.user) },
                    {
                        startDate: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                ],
            },
            include: {
                user: true, // Return all fields
            },
        });
    }

    // Create an appointment
    async createAppt(input: createApptDTO): Promise<Appointment> {
        console.log(typeof input.user)
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: parseInt(input.user),
            },
        });

        if (!userExist) {
            this.logger.warn('Tried to access an user that does not exist');
            throw new UserNotFoundException(parseInt(input.user));
        }

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return this.prisma.appointment.create({
            data: {
                name: input.name,
                startDate: input.startDate,
                endDate: input.endDate,
                timeZone,
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
    }

    // Update an appointment
    async updateAppt(id: number, params: updateApptDTO): Promise<Appointment> {
        try {
            return await this.prisma.appointment.update({
                where: { id },
                data: { ...params },
            });
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
                    id,
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
