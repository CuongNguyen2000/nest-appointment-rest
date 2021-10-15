import { IsString, IsEmail, IsEnum, MaxLength } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger'

export class updateUserDTO  {

    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    first_name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    last_name: string;

    @ApiProperty()
    @IsString()
    birthdate: string;

    @ApiProperty({ enum: ['DOCTOR', 'THERAPY', 'CARE_MANAGER']})
    @IsEnum(Role)
    role: Role;
}
