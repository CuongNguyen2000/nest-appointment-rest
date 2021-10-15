import { Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { createApptDTO } from './dto/createAppt.dto';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly apptService: AppointmentsService) {}

    @Get()
    async findAllAppts() {
        const appts = await this.apptService.appointments();
        return appts;
    }

    @Get(':id')
    async findOneAppt(@Param('id') id: string) {
        const appt = await this.apptService.appointment(id);
        return appt;
    }

    @Post('apptsByUser')
    async findApptsByUser(@Body() filter: getApptsDTO) {
        const appts = await this.apptService.appointmentsByUser(filter);
        return appts;
    }

    @Post('createAppt')
    async createOneAppt(@Body() input: createApptDTO) {
        const newAppt = await this.apptService.createAppt(input);
        return newAppt;
    }

    @Patch('updateAppt/:id')
    async updateOneAppt(@Param('id') id: string, @Body() input: updateApptDTO) {
        const apptUpdated = await this.apptService.updateAppt(id, input);
        return apptUpdated;
    }

    @Delete('deleteUser/:id')
    async deleteOneAppt(@Param('id') id: string) {
        const apptDeleted = await this.apptService.deleteAppt(id);
        return apptDeleted;
    }
}
