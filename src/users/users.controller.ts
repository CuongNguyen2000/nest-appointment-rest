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
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'OK' })
    async findAllUsers() {
        return this.userService.users();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'OK' })
    async findOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.user(id);
    }

    @Post('createUser')
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    async createOneUser(@Body() input: createUserDTO) {
        return this.userService.createUser(input);
    }

    @Patch('updateUser/:id')
    @ApiResponse({ status: 200, description: 'OK' })
    async updateOneUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: updateUserDTO,
    ) {
        return this.userService.updateUser(id, input);
    }

    @Delete('deleteUser/:id')
    @ApiResponse({ status: 200, description: 'Delete Success' })
    async deleteOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
