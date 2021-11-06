import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { LoggerService } from '../logger/logger.service'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PRIVATE_KEY, PUBLIC_KEY } from '../utils/readKey';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    let prismaService: PrismaService;
    let loggerService: LoggerService;
    let jwtService: JwtService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // imports: [
            //     ConfigModule,
            //     PassportModule.register({ defaultStrategy: 'jwt' }),
            //     JwtModule.registerAsync({
            //         imports: [ConfigModule],
            //         useFactory: async (configService: ConfigService) => ({
            //             secret: configService.get('JWT_SECRET'),
            //             signOptions: {
            //                 expiresIn: configService.get('JWT_EXPIRATION_TIME'),
            //             },
            //         }),
            //         inject: [ConfigService],
            //     }),
            // ],
            imports: [
                PassportModule,
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: () => {
                        return {
                            privateKey: PRIVATE_KEY,
                            publicKey: PUBLIC_KEY,
                            signOptions: { expiresIn: '60s', algorithm: 'RS256' },
                        };
                    },
                    inject: [ConfigService],
                }),
            ],
            controllers: [AuthController],
            providers: [
                AuthService,
                PrismaService,
                LoggerService,
                JwtService,
                ConfigService,
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
        prismaService = module.get<PrismaService>(PrismaService);
        loggerService = module.get<LoggerService>(LoggerService);
        jwtService = module.get<JwtService>(JwtService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    //should throw BadRequestException if account is already exist
    it('should throw BadRequestException if account is already exist', async () => {
        const user = {
            username: 'cn1122000',
            password: '123456'
        }
        const spy = jest.spyOn(authService, 'signUp').mockImplementation(() => {
            throw new BadRequestException('Account already exist');
        });
        await expect(controller.signUpAccount(user)).rejects.toThrow(BadRequestException);
        expect(spy).toBeCalled();
    });

    // should throw UnauthorizedException
    it('should throw UnauthorizedException', async () => {
        const user = {
            username: 'cn1122000',
            password: '123456'
        }
        const spy = jest.spyOn(authService, 'login').mockImplementation(() => {
            throw new UnauthorizedException()
        })
        await expect(controller.login(user)).rejects.toThrow(UnauthorizedException)
        expect(spy).toHaveBeenCalledWith(user)
    })
})