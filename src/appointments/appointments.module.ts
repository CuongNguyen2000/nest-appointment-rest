import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [AppointmentsService, AppointmentsResolver, PrismaService],
})
export class AppointmentsModule {}
