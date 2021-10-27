import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query('users')
    async posts() {
        return this.userService.users();
    }

    @Query('user')
    async post(@Args('id', ParseIntPipe) id: number) {
        return this.userService.user(id);
    }

    @Mutation('createUser')
    async create(@Args('input') args: createUserDTO) {
        return this.userService.createUser(args);
    }

    @Mutation('updateUser')
    async update(
        @Args('id', ParseIntPipe) id: number,
        @Args('input') args: updateUserDTO,
    ) {
        return this.userService.updateUser(id, args);
    }

    @Mutation('deleteUser')
    async delete(@Args('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
