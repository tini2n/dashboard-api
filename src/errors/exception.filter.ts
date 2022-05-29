import 'reflect-metadata';

import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../types';

import { HttpError } from './http-error.class';

import { IExceptionFilter } from './exception.filter.interface';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HttpError, req: Request, res: Response, _next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.ctx}] Error ${err.code} : ${err.message}`);
			res.status(err.code).send({ error: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ error: err.message });
		}
	}
}
