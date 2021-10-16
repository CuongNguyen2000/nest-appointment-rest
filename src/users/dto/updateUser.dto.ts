import { IsString, IsEmail, IsEnum, MaxLength } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class updateUserDTO {
    @ApiProperty({
        example: 'cn1122000@gmail.com',
        description: 'The email address that you registered',
        required: false,
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        example: 'Cuong',
        description: 'Your first name that you registered',
        required: false,
    })
    @IsString()
    @MaxLength(50)
    first_name: string;

    @ApiProperty({
        example: 'Nguyen',
        description: 'Your last name that you registered',
        required: false,
    })
    @IsString()
    @MaxLength(50)
    last_name: string;

    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
        description: 'Your birthdate that you registered',
        required: false,
    })
    @IsString()
    birthdate: string;

    @ApiProperty({ enum: ['DOCTOR', 'THERAPY', 'CARE_MANAGER'] })
    @IsEnum(Role)
    role: Role;
}
