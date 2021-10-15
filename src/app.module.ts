import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PrismaModule, UsersModule, AppointmentsModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
