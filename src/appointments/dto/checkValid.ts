import { Injectable, Logger } from '@nestjs/common';
import { createApptDTO } from '../dto/createAppt.dto';

@Injectable()
export class checkValid {
    private readonly logger = new Logger();

    static isValidTimeZone(tz: string): boolean {
        if (!Intl.DateTimeFormat().resolvedOptions().timeZone) {
            throw new Error('Time zones are not available in this environment');
        }
        try {
            Intl.DateTimeFormat(undefined, { timeZone: tz });
            return true;
        } catch (error) {
            return false;
        }
    }

    static validate(value: createApptDTO): string[] {
        const errors = [];
        const today = new Date();

        const startDate = Date.parse(value.startDate);
        const endDate = Date.parse(value.endDate);

        if (startDate < today.valueOf()) {
            errors.push('Start date must be greater than today');
        }

        if (startDate > endDate) {
            errors.push('End date must be greater than start date');
        }

        if (this.isValidTimeZone(value.timeZone.toString()) === false) {
            errors.push("'Timezone' must be a valid IANA time zone");
        } else {
            const now = new Date().toLocaleString('vi-VN');
            // console.log(typeof Date.parse(now));
            console.log(Date.parse(now));

            if (endDate < Date.parse(now)) {
                errors.push("'End' must not be in the past");
            }
        }

        return errors;
    }
}
