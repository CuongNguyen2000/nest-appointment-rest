import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class updateUserDTO  {
    @IsString()
    id: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    birthdate: string;

    @IsEnum(Role)
    role: Role;
}
