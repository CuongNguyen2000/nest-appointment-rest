import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { UserNotFoundException } from '../exceptions/NotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    private readonly logger = new Logger(UsersService.name);

    // Create a new
    async createUser(input: createUserDTO): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (user){
            this.logger.warn('Tried to create an user that already exists');
            throw new HttpException(
                'User is already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
            
        return this.prisma.user.create({ data: input });
    }

    // Get a single user
    async user(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            this.logger.warn('Tried to access a user that does not exist');
            throw new UserNotFoundException(id);
        }

        return user;
    }

    // Get multiple users
    async users(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    // Update a user
    async updateUser(id: number, params: updateUserDTO): Promise<User> {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: { ...params },
            });
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                this.logger.warn('Tried to access a user that does not exist');
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

        if (!user) {
            this.logger.warn('Tried to access a user that does not exist');
            throw new UserNotFoundException(id);
        }

        return this.prisma.user.delete({
            where: { id },
        });
    }
}
