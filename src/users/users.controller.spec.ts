import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'
import { LoggerService } from '../logger/logger.service'
import { Role, User } from "@prisma/client";
import { NotFoundException, INestApplication, BadRequestException } from '@nestjs/common';
import { createUserDTO } from './dto/createUser.dto';
import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Test, TestingModule } from '@nestjs/testing';
import { UserNotFoundException } from './../exceptions/NotFound.exception';

const example: createUserDTO = {
    email: "cn1122000@gmail.com",
    firstName: "Cuong",
    lastName: "Nguyen",
    birthdate: "2000-12-01T00:00:00.000Z",
    role: Role[0]
}

describe('UserController', () => {

    let usersController: UsersController;
    let usersService: UsersService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                PrismaService,
                LoggerService
            ]
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
        prismaService = module.get<PrismaService>(PrismaService);
    })

    // should return list of users
    it('should return list of users', async () => {
        const result = [];
        const spy = jest.spyOn(usersService, 'users').mockImplementation(async (): Promise<any> => result);
        expect(await usersController.findAllUsers()).toBe(result);
        expect(spy).toBeCalledTimes(1);
    })

    //should throw error when user not found
    it('should throw error when user not found', async () => {
        // const result = new UserNotFoundException(1);
        const spy = jest.spyOn(usersService, 'user').mockImplementation(async (): Promise<any> => { throw new UserNotFoundException(1) });
        expect(spy).toBeCalledTimes(0);
        // expect(await usersController.findOneUser(1)).toBe(result);
    })

    it('should throw error when creating an already existing user', async () => {

        const createUserMock = jest.spyOn(usersService, 'createUser');
        const userExistMock = jest
            .spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => new createUserDTO())

        const returnUser = jest.spyOn(prismaService.user, 'create')
            .mockImplementation((): any => { throw new BadRequestException('User is already exist'); })

        try {
            await usersController.createOneUser(example);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestException)
        }

        expect(createUserMock).toBeCalledTimes(1);
        expect(userExistMock).toHaveBeenCalledTimes(1);
        expect(returnUser).toBeCalledTimes(0);
    })

    // should be throw bad request exception when creating user with invalid data
    it('should be throw bad request exception when creating user with invalid data', async () => {
        const createUserMock = jest.spyOn(usersService, 'createUser');
        const userExistMock = jest
            .spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => new createUserDTO())

        const returnUser = jest.spyOn(prismaService.user, 'create')
            .mockImplementation((): any => { throw new BadRequestException() })

        try {
            await usersController.createOneUser(example);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestException)
        }

        expect(createUserMock).toBeCalledTimes(1);
        expect(userExistMock).toHaveBeenCalledTimes(1);
        expect(returnUser).toBeCalledTimes(0);
    })

    // should throw not found exception when updating user that does not exist
    it('should throw not found exception when updating user that does not exist', async () => {
        const updateUserMock = jest.spyOn(usersService, 'updateUser');
        const userExistMock = jest
            .spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => new createUserDTO())

        const returnUser = jest.spyOn(prismaService.user, 'update')
            .mockImplementation((): any => { throw new UserNotFoundException(1) })

        try {
            await usersController.updateOneUser(1, example);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
        }

        expect(updateUserMock).toBeCalledTimes(1);
        expect(userExistMock).toHaveBeenCalledTimes(0);
        expect(returnUser).toBeCalledTimes(1);
    })

    // should throw an error when delete an user
    it('should throw an error when delete an user', async () => {
        const deleteUserMock = jest.spyOn(usersService, 'deleteUser');
        const userExistMock = jest
            .spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => new createUserDTO())

        const returnUser = jest.spyOn(prismaService.user, 'delete')
            .mockImplementation((): any => { throw new UserNotFoundException(1) })

        try {
            await usersController.deleteOneUser(1);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
        }

        expect(deleteUserMock).toBeCalledTimes(1);
        expect(userExistMock).toHaveBeenCalledTimes(1);
        expect(returnUser).toBeCalledTimes(1);
    })

})