import { Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'OK'})
    async findAllUsers() {
        const users = await this.userService.users();
        return users
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'OK'})
    async findOneUser(@Param('id') id: string) {
        const user = await this.userService.user(id);
        return user
    }

    @Post('createUser')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    async createOneUser(@Body() input: createUserDTO) {
        const newUser = await this.userService.createUser(input);
        return newUser;
    }

    @Patch('updateUser/:id')
    @ApiResponse({ status: 200, description: 'OK'})
    async updateOneUser(@Param('id') id: string, @Body() input: updateUserDTO) {
        const userUpdated = await this.userService.updateUser(id, input);
        return userUpdated;
    }

    @Delete('deleteUser/:id')
    @ApiResponse({ status: 200, description: 'Delete Success'})
    async deleteOneUser(@Param('id') id: string) {
        const userDeleted = await this.userService.deleteUser(id);
        return userDeleted;
    }

}
