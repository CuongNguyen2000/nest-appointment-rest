import { UserNotFoundException } from './../exceptions/NotFound.exception';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaService } from './../prisma/prisma.service'
import { BadRequestException } from '@nestjs/common';
import { createUserDTO } from './dto/createUser.dto';
import { Role } from '@prisma/client';

const example: createUserDTO = {
    email: "cn1122000@gmail.com",
    firstName: "Cuong",
    lastName: "Nguyen",
    birthdate: "2000-12-01T00:00:00.000Z",
    role: Role[0]
}

describe('UsersResolver', () => {
    let resolver: UsersResolver;
    let usersService: UsersService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersResolver, UsersService, PrismaService],
        }).compile();

        resolver = module.get<UsersResolver>(UsersResolver);
        usersService = module.get<UsersService>(UsersService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    // should throw BadRequestException if user already exists
    it('should throw BadRequestException if user already exists', async () => {
        const createUserMock = jest.spyOn(usersService, 'createUser');
        const userExistMock = jest
            .spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => new createUserDTO())

        const returnUser = jest.spyOn(prismaService.user, 'create')
            .mockImplementation((): any => { throw new BadRequestException('User is already exist'); })

        await expect(resolver.create(example)).rejects.toThrow(BadRequestException);
        expect(createUserMock).toBeCalledTimes(1);
        expect(userExistMock).toHaveBeenCalledTimes(1);
        expect(returnUser).toBeCalledTimes(0);
    })

    // Should throw UserNotFoundException when get single user
    it('should throw UserNotFoundException when get single user', async () => {
        const findUserMock = jest.spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => { throw new UserNotFoundException(1); })

        await expect(resolver.user(1)).rejects.toThrow(UserNotFoundException);
        expect(findUserMock).toBeCalledTimes(1);
    })

    // should throw UserNotFoundException when update user
    it('should throw UserNotFoundException when update user', async () => {
        const findUserMock = jest.spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => { throw new UserNotFoundException(1); })

        await expect(resolver.update(1, example)).rejects.toThrow(UserNotFoundException);
        expect(findUserMock).toBeCalledTimes(1);
    })

    // should throw UserNotFoundException when delete user
    it('should throw UserNotFoundException when delete user', async () => {
        const findUserMock = jest.spyOn(prismaService.user, 'findUnique')
            .mockImplementation((): any => { throw new UserNotFoundException(1); })

        await expect(resolver.delete(1)).rejects.toThrow(UserNotFoundException);
        expect(findUserMock).toBeCalledTimes(1);
    })
});
