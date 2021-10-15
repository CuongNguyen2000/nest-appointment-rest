import { IsString } from 'class-validator';

export class getApptsDTO {
    @IsString()
    user: string;

    @IsString()
    name: string;

    @IsString()
    start_date: string;

    @IsString()
    end_date: string;
}
