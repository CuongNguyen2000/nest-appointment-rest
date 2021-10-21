import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
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
    constructor(private readonly apptService: AppointmentsService) { }
    private readonly logger = new Logger(AppointmentsController.name);

    @Get(':id')
    @ApiOkResponse({ type: getApptsDTO, description: 'OK' })
    async findOneAppt(@Param('id', ParseIntPipe) id: number) {
        this.logger.verbose(`Retrieving specific appointment with id: ${id}`);
        return this.apptService.appointment(id);
    }

    @Post('apptsByUser')
    @ApiOkResponse({ type: createApptDTO, description: 'OK', isArray: true })
    async findApptsByUser(@Body() filter: getApptsDTO) {
        this.logger.verbose(`Retrieving all appointment by filter: ${JSON.stringify(filter)}`);
        return this.apptService.appointmentsByUser(filter);
    }

    @Post('createAppt')
    @ApiCreatedResponse({
        type: createApptDTO,
        description: 'The record has been successfully created.',
    })
    async createOneAppt(@Body() input: createApptDTO) {
        // console.log(typeof input.validate());

        // const errors = input.validate();
        // if (errors.length > 0) {
        //     throw new BadRequestException(errors)
        // }

        this.logger.verbose(`Create an appointment from userId: ${input.user}`);
        return this.apptService.createAppt(input);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Patch('updateAppt/:id')
    @ApiOkResponse({ type: updateAppEntity, description: 'OK' })
    async updateOneAppt(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: updateApptDTO,
    ) {
        this.logger.verbose(`Update an appointment with id: ${id}`);
        return new updateAppEntity(
            await this.apptService.updateAppt(id, input),
        );
    }

    @Delete('deleteAppt/:id')
    @ApiResponse({ status: 204, description: 'Delete Success' })
    async deleteOneAppt(@Param('id', ParseIntPipe) id: number) {
        this.logger.verbose(`Delete an appointment with id: ${id}`);
        return this.apptService.deleteAppt(id);
    }
}
