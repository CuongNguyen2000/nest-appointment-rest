import { PartialType } from '@nestjs/swagger';
import { createUserDTO } from './createUser.dto';

export class getUsersDTO extends PartialType(createUserDTO) {}
