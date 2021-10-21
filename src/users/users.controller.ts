import {
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
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { UpdateUserEntity } from './entities/updateUser.entity';
import { UserEntity } from './entities/user.entity';
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
    private readonly logger = new Logger(UsersController.name);

    @Get()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAllUsers() {
        this.logger.verbose('Retrieving all users.');
        return this.userService.users();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    async findOneUser(@Param('id', ParseIntPipe) id: number) {
        this.logger.verbose(`Retrieving specific user with id: ${id}`);
        return new UserEntity(await this.userService.user(id));
    }

    @Post('createUser')
    @ApiCreatedResponse({
        type: createUserDTO,
        description: 'The record has been successfully created.',
    })
    async createOneUser(@Body() input: createUserDTO) {
        this.logger.verbose('Create an user.');
        return this.userService.createUser(input);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Patch('updateUser/:id')
    @ApiOkResponse({
        type: UpdateUserEntity,
        description: 'The record has been successfully update',
    })
    async updateOneUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: updateUserDTO,
    ) {
        this.logger.verbose(`Update an user with id: ${id}`);
        return new UpdateUserEntity(
            await this.userService.updateUser(id, input),
        );
    }

    @Delete('deleteUser/:id')
    @ApiResponse({ status: 204, description: 'Delete Success' })
    async deleteOneUser(@Param('id', ParseIntPipe) id: number) {
        this.logger.verbose(`Delete an user with id: ${id}`);
        return this.userService.deleteUser(id);
    }
}
