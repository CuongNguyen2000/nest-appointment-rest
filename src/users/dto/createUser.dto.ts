import { IsNotEmpty, IsOptional, IsString, IsEmail, IsEnum, MaxLength} from 'class-validator';
import { Role } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class createUserDTO {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly first_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly last_name: string;

    @IsOptional()
    @ApiProperty({ required: false, nullable: true })
    @IsString()
    readonly birthdate: string;

    @ApiProperty({ enum: ['DOCTOR', 'THERAPY', 'CARE_MANAGER']})
    @IsEnum(Role)
    readonly role: Role
}
