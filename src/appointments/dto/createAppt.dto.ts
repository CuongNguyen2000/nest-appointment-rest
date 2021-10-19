import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createApptDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    user: number;

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
    startDate: string;

    @ApiProperty({
        description: 'Appointment end date',
        example: '2021-11-23T00:00:00.000Z',
    })
    @IsString()
    @IsNotEmpty()
    endDate: string;

    // @ApiProperty({ description: 'time zone string', example: 'Asia/Saigon' })
    @IsString()
    @IsNotEmpty()
    timeZone: string;

    validate(): string[] {
        const errors = [];
        const today = new Date();

        const startDate = Date.parse(this.startDate);
        const endDate = Date.parse(this.endDate);

        console.log('hhhhh');

        if (startDate < today.valueOf()) {
            errors.push("Start date must be greater than today");
        }

        if (startDate > endDate) {
            errors.push("End date must be greater than start date");
        }

        return errors;
    }
}
