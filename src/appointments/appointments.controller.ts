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
        return this.apptService.appointment(id);
    }

    @Post('apptsByUser')
    async findApptsByUser(@Body() filter: getApptsDTO) {
        return this.apptService.appointmentsByUser(filter);
    }

    @Post('createAppt')
    async createOneAppt(@Body() input: createApptDTO) {
        return this.apptService.createAppt(input);
    }

    @Patch('updateAppt/:id')
    async updateOneAppt(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: updateApptDTO,
    ) {
        return this.apptService.updateAppt(id, input);
    }

    @Delete('deleteAppt/:id')
    @ApiResponse({ status: 200, description: 'Delete Success' })
    async deleteOneAppt(@Param('id', ParseIntPipe) id: number) {
        return this.apptService.deleteAppt(id);
    }
}
