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
import { Exclude, Transform } from 'class-transformer';

export class UserEntity {
    @ApiProperty({
        example: 'cn1122000@gmail.com',
        description: 'Your email address',
        required: true,
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'Cuong',
        description: 'Your first name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @ApiProperty({
        example: 'Nguyen',
        description: 'Your last name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @IsOptional()
    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
        description: 'Your birthdate',
        required: false,
        nullable: true,
    })
    @IsString()
    birthdate: Date;

    @Transform(({ value }) => value.name)
    @ApiProperty({ enum: ['DOCTOR', 'THERAPY', 'CARE_MANAGER'] })
    @IsEnum(Role)
    role: Role;

    @Exclude() createdAt: Date;
    @Exclude() updatedAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
