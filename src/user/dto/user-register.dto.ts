import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDTO {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Password is empty' })
	password: string;

	@IsString({ message: 'Name is empty' })
	name: string;
}
