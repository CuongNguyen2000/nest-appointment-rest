import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class getApptsDTO {
    @ApiProperty()
    @IsString()
    user: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    start_date: string;

    @ApiProperty()
    @IsString()
    end_date: string;
}
