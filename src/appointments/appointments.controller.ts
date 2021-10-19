import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { createApptDTO } from './dto/createAppt.dto';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';
import { updateAppEntity } from './entities/updateUser.entity';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@Controller('appointments')
@ApiTags('Appointments')
export class AppointmentsController {
    constructor(private readonly apptService: AppointmentsService) {}

    @Get(':id')
    @ApiOkResponse({ type: getApptsDTO, description: 'OK' })
    async findOneAppt(@Param('id', ParseIntPipe) id: number) {
        return this.apptService.appointment(id);
    }

    @Post('apptsByUser')
    @ApiOkResponse({ type: createApptDTO, description: 'OK', isArray: true })
    async findApptsByUser(@Body() filter: getApptsDTO) {
        return this.apptService.appointmentsByUser(filter);
    }

    @Post('createAppt')
    @ApiCreatedResponse({
        type: createApptDTO,
        description: 'The record has been successfully created.',
    })
    async createOneAppt(@Body() input: createApptDTO) {
        return this.apptService.createAppt(input);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Patch('updateAppt/:id')
    @ApiOkResponse({ type: updateAppEntity, description: 'OK' })
    async updateOneAppt(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: updateApptDTO,
    ) {
        return new updateAppEntity(
            await this.apptService.updateAppt(id, input),
        );
    }

    @Delete('deleteAppt/:id')
    @ApiResponse({ status: 204, description: 'Delete Success' })
    async deleteOneAppt(@Param('id', ParseIntPipe) id: number) {
        return this.apptService.deleteAppt(id);
    }
}
