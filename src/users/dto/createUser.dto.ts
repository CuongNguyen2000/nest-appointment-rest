import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
    IsEnum,
    MaxLength,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
    @ApiProperty({
        example: 'cn1122000@gmail.com',
        description: 'Your email address',
        required: true,
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        example: 'Cuong',
        description: 'Your first name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly first_name: string;

    @ApiProperty({
        example: 'Nguyen',
        description: 'Your last name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly last_name: string;

    @IsOptional()
    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
        description: 'Your birthdate',
        required: false,
        nullable: true,
    })
    @IsString()
    readonly birthdate: string;

    @ApiProperty({ enum: ['DOCTOR', 'THERAPY', 'CARE_MANAGER'] })
    @IsEnum(Role)
    readonly role: Role;
}
