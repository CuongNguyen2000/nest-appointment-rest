import { NotFoundException } from '@nestjs/common';

export class ApptNotFoundException extends NotFoundException {
    constructor(apptId: number) {
        super(`Appointment with id ${apptId} not found`);
    }
}

export class UserNotFoundException extends NotFoundException {
    constructor(userId: number) {
        super(`User with id ${userId} not found`);
    }
}
