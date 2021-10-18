import { createUserDTO } from './createUser.dto';
import { PartialType } from '@nestjs/swagger';

export class updateUserDTO extends PartialType(createUserDTO) {}
