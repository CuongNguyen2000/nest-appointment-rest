import { IsString } from 'class-validator';

export class updateApptDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    start_date: string;

    @IsString()
    end_date: string;
}
