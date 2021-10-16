import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createApptDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly user: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly start_date: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly end_date: string;
}
