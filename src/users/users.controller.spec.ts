import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

describe('usersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        // create fake copy of usersService
        const fakeUsersService = {
            findUnique: () => Promise.resolve([]),
            create: (role: string, email: string, firstName: string, lastName: string, birthdate: Date) => Promise.resolve({ id: 1, role, email, firstName, lastName, birthdate }),
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: PrismaService,
                    useValue: fakeUsersService
                }
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        usersController = module.get<UsersController>(UsersController);
    });


    it('should return an array of users', async () => {
        const result = [];
        jest.spyOn(usersService, 'users').mockImplementation(async () => result);

        expect(await usersController.findAllUsers()).toBe(result);
    });

})