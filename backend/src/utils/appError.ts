export class AppError extends Error {
    statusCode: number;
    errors?: any;

    constructor(
        message: string,
        statusCode = 500,
        errors?: any
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}