import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
    IsEnum,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UpdateUserEntity {

    @ApiProperty({
        example: 'cn1122000@gmail.com',
        description: 'Your email address',
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'Cuong',
        description: 'Your first name',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @ApiProperty({
        example: 'Nguyen',
        description: 'Your last name',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @IsOptional()
    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
        description: 'Your birthdate',
        nullable: true,
    })
    @IsString()
    birthdate: Date;

    @ApiProperty({ enum: ['DOCTOR', 'THERAPY', 'CARE_MANAGER'] })
    @IsEnum(Role)
    role: Role;

    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
        description: 'Last modified date',
    })
    @IsString()
    updatedAt: Date;

    @Exclude() createdAt: Date;

    constructor(partial: Partial<UpdateUserEntity>) {
        Object.assign(this, partial);
    }
}