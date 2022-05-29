export class HttpError extends Error {
	code: number;
	ctx?: string;

	constructor(message: string, code: number, ctx?: string) {
		super(message);

		this.code = code;
		this.message = message;
		this.ctx = ctx;
	}
}
