export class ApiResponse<T= any>{
    success: boolean;
    message: string;
    data?: T;

    constructor(success: boolean, message: string, data: T) {
        this.success = success;
        this.message = message;
        if (data !== undefined) this.data = data;    }
}