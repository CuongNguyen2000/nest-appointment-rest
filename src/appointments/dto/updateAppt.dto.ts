import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateApptDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty()
    @IsString()
    start_date: string;

    @ApiProperty()
    @IsString()
    end_date: string;
}
