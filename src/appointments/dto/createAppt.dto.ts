import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { NewAppt } from '../../graphql';

export class createApptDTO {
    // @IsString()
    // @IsNotEmpty()
    // user: string;

    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    endDate: string;

    @IsString()
    @IsNotEmpty()
    timeZone: string;
}
