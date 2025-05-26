import {Request, Response, NextFunction} from 'express';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        error: {
            name: 'Internal Server Error',
            message: error.message || 'Something went wrong',
            errors: error.errors || undefined
        }
    })
}