import { NextFunction, Response, Request, Router } from 'express';

export interface IControllerRoute {
	path: string;
	methodLegacy?: 'get' | 'post' | 'put' | 'delete' | 'patch';
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
	func: (req: Request, res: Response, next: NextFunction) => void;
}

export type ExpressReturnType = Response<any, Record<string, any>>;
