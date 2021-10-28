import { BadRequestException, ParseIntPipe, UsePipes } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { createApptDTO } from './dto/createAppt.dto';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';
import { checkValid } from './dto/checkValid';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Resolver()
export class AppointmentsResolver {
    constructor(private readonly apptService: AppointmentsService) {}

    @Query('appointment')
    async appointment(@Args('id', ParseIntPipe) id: number) {
        return this.apptService.appointment(id);
    }

    @Query('appointmentsByUser')
    // @UsePipes(new ValidationPipe())
    async appointmentsByUser(@Args('filter') args: getApptsDTO) {
        return this.apptService.appointmentsByUser(args);
    }

    @Mutation('createAppt')
    @UsePipes(new ValidationPipe())
    async create(
        @Args('user', ParseIntPipe) user: number,
        @Args('input') input: createApptDTO) {
        const errors = checkValid.validate(input);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return this.apptService.createAppt(user,input);
    }

    @Mutation('updateAppt')
    // @UsePipes(new ValidationPipe())
    async update(
        @Args('id', ParseIntPipe) id: number,
        @Args('input') args: updateApptDTO,
    ) {
        return this.apptService.updateAppt(id, args);
    }

    @Mutation('deleteAppt')
    async delete(@Args('id', ParseIntPipe) id: number) {
        return this.apptService.deleteAppt(id);
    }
}
