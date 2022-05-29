import 'reflect-metadata';

import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'http';

import { TYPES } from './types';

import { ILogger } from './logger/logger.interface';
import { UserController } from './user/user.controller';
import { ExceptionFilter } from './errors/exception.filter';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/user', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		this.useRoutes();
		this.useExceptionFilters();

		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server running on http://localhost:${this.port}`);
		});
	}
}
