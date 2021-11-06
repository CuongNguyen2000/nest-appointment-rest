import {
    BadRequestException,
    Injectable,
    Logger,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { User } from '@prisma/client';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { UserNotFoundException } from '../exceptions/NotFound.exception';
import { LoggerService } from './../logger/logger.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    private readonly logger: LoggerService = new Logger(UsersService.name);

    // Create a new
    async createUser(input: createUserDTO): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (user) {
            this.logger.warn('Tried to create an user that already exists');
            throw new BadRequestException('User is already exist');
        }

        return this.prisma.user.create({
            data: input,
            include: {
                appointments: true,
            },
        });
    }

    // Get a single user
    async user(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                appointments: true,
            },
        });

        if (!user) {
            this.logger.warn('Tried to access a user that does not exist');
            throw new UserNotFoundException(id);
        }

        return user;
    }

    // Get multiple users
    async users(): Promise<User[]> {
        return this.prisma.user.findMany({
            include: {
                appointments: true,
            },
        });
    }

    // Update a user
    async updateUser(id: number, params: updateUserDTO): Promise<User> {

        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            this.logger.warn('Tried to access a user that does not exist');
            throw new UserNotFoundException(id);
        }

        return await this.prisma.user.update({
            where: { id },
            data: { ...params },
        });
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
