import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'
import { LoggerService } from '../logger/logger.service'
import { Role } from "@prisma/client";
import { NotFoundException, INestApplication, BadRequestException } from '@nestjs/common';
import { createUserDTO } from './dto/createUser.dto';
import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@prisma/client/runtime';

const example: createUserDTO = {
    email: "cn1122000@gmail.com",
    firstName: "Cuong",
    lastName: "Nguyen",
    birthdate: "2000-12-01T00:00:00.000Z",
    role: Role[0]
}

describe('UserController', () => {

    let usersController: UsersController;
    let usersService: UsersService
    let prismaService: PrismaService

    beforeAll(() => console.log('Running test'))
    beforeEach(() => {
        prismaService = new PrismaService();
        usersService = new UsersService(prismaService);
        usersController = new UsersController(usersService);
    })

    it('should return a list of users', async () => {
        const result = [];
        const spy = jest
            .spyOn(usersService, 'users')
            .mockImplementation((): any => result)

        expect(await usersController.findAllUsers())
            .toBe(result);
        expect(spy).toBeCalledTimes(1);
    })

    it('should throw error when creating an already existing user', async () => {

        const createUserMock = jest.spyOn(usersService, 'createUser');
        const userExistMock = jest
            .spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => new createUserDTO())

        const returnUser = jest.spyOn(prismaService.user, 'create')
            .mockImplementation((): any => { example })

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

    it('should throw bad request when delete an user', async () => {

        const deleteSpy = jest.spyOn(usersService, 'deleteUser');
        const findSpy = jest.spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => undefined)

        try {
            await usersController.deleteOneUser(1);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
        }
        const deleteSuccessfullSpy = jest.spyOn(prismaService.user, 'delete')
            .mockImplementation((): any => undefined)

        expect(deleteSpy).toBeCalledTimes(1);
        expect(findSpy).toHaveBeenCalledTimes(1);
        expect(deleteSuccessfullSpy).toBeCalledTimes(0);
    })

    // it('should delete successfully when delete an user', async () => {

    //     const deleteSpy = jest.spyOn(usersService, 'remove');
    //     const findSpy = jest.spyOn(prismaSevice.user, 'findUnique')
    //         .mockImplementation((): any => new CreateUserDto)
    //     const deleteSuccessfullSpy = jest.spyOn(prismaSevice.user, 'delete')
    //         .mockImplementation((): any => undefined)

    //     await usersController.remove(1);



    //     expect(deleteSpy).toBeCalledTimes(1);
    //     expect(findSpy).toHaveBeenCalledTimes(1);
    //     expect(deleteSuccessfullSpy).toBeCalledTimes(1);
    // })

})