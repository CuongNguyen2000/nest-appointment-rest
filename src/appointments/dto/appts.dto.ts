import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class getApptsDTO {
    @ApiProperty()
    @IsNumber()
    user: number;

    @ApiProperty({
        description: 'Appointment start date',
        example: '2021-11-23T00:00:00.000Z',
    })
    @IsString()
    timeFrom: string;

    @ApiProperty({
        description: 'Appointment start date',
        example: '2021-11-23T00:00:00.000Z',
    })
    @IsString()
    timeTo: string;
}
