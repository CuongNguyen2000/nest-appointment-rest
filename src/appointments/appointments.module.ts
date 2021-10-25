import { LoggerModule } from './../logger/logger.module';
import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [LoggerModule],
    providers: [AppointmentsService, PrismaService],
    controllers: [AppointmentsController],
})
export class AppointmentsModule {}
