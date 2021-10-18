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
import { getUsersDTO } from './dto/users.dto';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @ApiOkResponse({ type: getUsersDTO, isArray: true })
    async findAllUsers() {
        return this.userService.users();
    }

    @Get(':id')
    @ApiOkResponse({ type: getUsersDTO })
    async findOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.user(id);
    }

    @Post('createUser')
    @ApiCreatedResponse({
        type: createUserDTO,
        description: 'The record has been successfully created.',
    })
    async createOneUser(@Body() input: createUserDTO) {
        return this.userService.createUser(input);
    }

    @Patch('updateUser/:id')
    // @ApiResponse({ status: 200, description: 'OK' })
    @ApiOkResponse({
        type: updateUserDTO,
        description: 'The record has been successfully update',
    })
    async updateOneUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: updateUserDTO,
    ) {
        return this.userService.updateUser(id, input);
    }

    @Delete('deleteUser/:id')
    @ApiResponse({ status: 204, description: 'Delete Success' })
    async deleteOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
