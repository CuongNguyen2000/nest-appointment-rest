import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class getApptsDTO {
    @IsNumber()
    user: string;

    @IsString()
    timeFrom: string;

    @IsString()
    timeTo: string;
}
