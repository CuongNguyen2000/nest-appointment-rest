import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class updateAppEntity {
    @ApiProperty({ description: 'Name of appointment', example: 'Brace' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Appointment start date',
        example: '2021-11-23T00:00:00.000Z',
    })
    @IsString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({
        description: 'Appointment end date',
        example: '2021-11-23T00:00:00.000Z',
    })
    @IsString()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'time zone string', example: 'Asia/Saigon' })
    @IsString()
    @IsNotEmpty()
    timeZone: string;

    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
        description: 'Last modified date',
    })
    @IsString()
    updatedAt: Date;

    @Exclude() createdAt: Date;

    constructor(partial: Partial<updateAppEntity>) {
        Object.assign(this, partial);
    }
}
