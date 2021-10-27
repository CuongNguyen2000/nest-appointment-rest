import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { LoggerModule } from './logger/logger.module';
import LogsMiddleware from './utils/logs.middleware';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
        }),
        PrismaModule,
        LoggerModule,
        UsersModule,
        AppointmentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
