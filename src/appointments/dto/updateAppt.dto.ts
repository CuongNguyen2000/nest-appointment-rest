import { IsString } from 'class-validator';
import { UpdateAppt } from '../../graphql';

export class updateApptDTO {

    @IsString()
    name: string;

    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    @IsString()
    timeZone: string;
}
