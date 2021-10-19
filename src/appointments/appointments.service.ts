import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
    constructor(private prisma: PrismaService) {}
    private readonly logger = new Logger(AppointmentsService.name);

    // Get a single appointment
    async appointment(id: number): Promise<Appointment> {
        const appt = await this.prisma.appointment.findUnique({
            where: { id },
        });

        if (!appt) {
            this.logger.warn('Tried to access an appointment that does not exist');
            throw new ApptNotFoundException(id);
        }

        return appt;
    }

    //get list appointment by user
    async appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]> {
        const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: filter.user,
            },
        });

        if (!userExist) {
            this.logger.warn('Tried to access an user that does not exist');
            throw new UserNotFoundException(filter.user);
        } 

        const startDate = new Date(Date.parse(filter.timeFrom));
        const endDate = new Date(Date.parse(filter.timeTo));

        if (Date.parse(filter.timeFrom) < today.valueOf()) {
            this.logger.warn('Start date must be greater than today');
            throw new BadRequestException('Start date must be greater than today')
        }

        if (Date.parse(filter.timeFrom) > Date.parse(filter.timeTo)) {
            this.logger.warn('End date must be greater than start date');
            throw new BadRequestException('End date must be greater than start date')
        }

        return this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: filter.user },
                    {
                        startDate: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                ],
            },
        });
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

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (Date.parse(input.startDate) < today.valueOf()) {
            this.logger.warn('Start date must be greater than today');
            throw new BadRequestException('Start date must be greater than today')
        }

        if (Date.parse(input.startDate) > Date.parse(input.endDate)) {
            this.logger.warn('End date must be greater than start date');
            throw new BadRequestException('End date must be greater than start date')
        }

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
        });
    }

    // Update an appointment
    async updateAppt(id: number, params: updateApptDTO): Promise<Appointment> {
        const { startDate, endDate } = params;
        const today = new Date();

        if (Date.parse(startDate) < today.valueOf()) {
            this.logger.warn('Start date must be greater than today');
            throw new BadRequestException('Start date must be greater than today')
        }

        if (Date.parse(startDate) > Date.parse(endDate)) {
            this.logger.warn('End date must be greater than start date');
            throw new BadRequestException('End date must be greater than start date')
        }

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
