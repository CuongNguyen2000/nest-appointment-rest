import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '@prisma/client'

export class createUserDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly first_name: string;

    @IsString()
    @IsNotEmpty()
    readonly last_name: string;

    @IsString()
    readonly birthdate: string;

    @IsEnum(Role)
    readonly role: Role
}
