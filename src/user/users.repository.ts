import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from '../types';
import { User } from './user.entity';

import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				name,
				password,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
