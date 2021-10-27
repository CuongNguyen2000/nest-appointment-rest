import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { NewUser, EnumUserRole } from '../../graphql';

export class createUserDTO extends NewUser {
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

    @IsEnum(EnumUserRole)
    readonly role: EnumUserRole;
}
