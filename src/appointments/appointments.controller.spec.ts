import { createApptDTO } from './dto/createAppt.dto';
import { Test } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service'
import { PrismaService } from '../prisma/prisma.service'
import { Appointment } from '@prisma/client';
import { ApptNotFoundException } from './../exceptions/NotFound.exception';

describe('AppointmentsController', () => {
    let appointmentsController: AppointmentsController;
    let appointmentsService: AppointmentsService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AppointmentsController],
            providers: [AppointmentsService, PrismaService]
        }).compile();

        appointmentsController = module.get<AppointmentsController>(AppointmentsController);
        appointmentsService = module.get<AppointmentsService>(AppointmentsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    //should return an appointment
    describe("create", () => {
        it("should return an appointment", async () => {
            const result: createApptDTO = {
                user: 1,
                name: "Test",
                startDate: "2020-07-07T00:00:00.000Z",
                endDate: "2020-07-07T00:00:00.000Z",
                timeZone: "America/New_York",
            };

            const spy = jest.spyOn(appointmentsService, "createAppt").mockImplementation(async (): Promise<any> => result);
            expect(spy).toBeCalledTimes(0);
        });
    })

    //should be throw an error when delete an appointment
    describe("delete", () => {
        it("should throw an error when delete an appointment", async () => {
            const spy = jest.spyOn(appointmentsService, "deleteAppt").mockImplementation(async (): Promise<any> => {
                throw new ApptNotFoundException(1);
            });
            expect(spy).toBeCalledTimes(0);
        });
    })

    //should be throw an error when update an appointment
    describe("update", () => {
        it("should throw an error when update an appointment", async () => {
            const spy = jest.spyOn(appointmentsService, "updateAppt").mockImplementation(async (): Promise<any> => {
                throw new ApptNotFoundException(1);
            });
            expect(spy).toBeCalledTimes(0);
        });
    })

    //should be throw an error when get an appointment by id 
    describe("getById", () => {
        it("should throw an error when get an appointment by id", async () => {
            const spy = jest.spyOn(appointmentsService, "appointment").mockImplementation(async (): Promise<any> => {
                throw new ApptNotFoundException(1);
            });
            expect(spy).toBeCalledTimes(0);
        });
    })
});