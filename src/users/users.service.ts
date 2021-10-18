import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { UserNotFoundException } from '../exceptions/NotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // Create a new
    async createUser(input: createUserDTO): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (user)
            throw new HttpException(
                'User is already exist',
                HttpStatus.BAD_REQUEST,
            );

        return this.prisma.user.create({ data: input });
    }

    // Get a single user
    async user(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) throw new UserNotFoundException(id);

        return user;
    }

    // Get multiple users
    async users(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    // Update a user
    async updateUser(id: number, params: updateUserDTO): Promise<User> {
        const { firstName, lastName, birthdate, role } = params;

        try {
            return this.prisma.user.update({
                where: { id },
                data: {
                    ...(firstName && { firstName }),
                    ...(lastName && { lastName }),
                    ...(birthdate && { birthdate }),
                    ...(role && { role }),
                },
            });
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new UserNotFoundException(id);
            }
            throw error;
        }
    }

    // delete an user
    async deleteUser(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) throw new UserNotFoundException(id);

        const deleteUser = this.prisma.user.delete({
            where: { id },
        });

        const deleteAppts = this.prisma.appointment.deleteMany({
            where: {
                userId: id,
            },
        });

        await this.prisma.$transaction([deleteAppts, deleteUser]);

        return user;
    }
}
