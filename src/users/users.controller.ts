import { Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async findAllUsers() {
        const users = await this.userService.users();
        return users
    }

    @Get(':id')
    async findOneUser(@Param('id') id: string) {
        const user = await this.userService.user(id);
        return user
    }

    @Post('createUser')
    async createOneUser(@Body() input: createUserDTO) {
        const newUser = await this.userService.createUser(input);
        return newUser;
    }

    @Patch('updateUser/:id')
    async updateOneUser(@Param('id') id: string, @Body() input: updateUserDTO) {
        const userUpdated = await this.userService.updateUser(id, input);
        return userUpdated;
    }

    @Delete('deleteUser/:id')
    async deleteOneUser(@Param('id') id: string) {
        const userDeleted = await this.userService.deleteUser(id);
        return userDeleted;
    }

}
