import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { createApptDTO } from './dto/createAppt.dto';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('appointments')
@ApiTags('Appointments')
export class AppointmentsController {
    constructor(private readonly apptService: AppointmentsService) {}

    @Get(':id')
    @ApiResponse({ status: 200, description: 'OK' })
    async findOneAppt(@Param('id', ParseIntPipe) id: number) {
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
    async updateOneAppt(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: updateApptDTO,
    ) {
        const apptUpdated = await this.apptService.updateAppt(id, input);
        return apptUpdated;
    }

    @Delete('deleteAppt/:id')
    @ApiResponse({ status: 200, description: 'Delete Success' })
    async deleteOneAppt(@Param('id', ParseIntPipe) id: number) {
        const apptDeleted = await this.apptService.deleteAppt(id);
        return apptDeleted;
    }
}
