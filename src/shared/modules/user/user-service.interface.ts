import {DocumentType} from '@typegoose/typegoose';

import {DocumentExists} from '../../libs/rest/index.js';
import {UserEntity} from './user.entity.js';
import {CreateUserDTO} from './dto/create-user.dto.js';
import {UpdateUserDTO} from './dto/update-user.dto.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
