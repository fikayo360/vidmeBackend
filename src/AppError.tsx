interface AppError {
    message: string;
    statusCode: number;
}

class AppError extends Error implements AppError{
    constructor(message:string,statusCode:number){
        super(message);
        this.statusCode = statusCode;
    }
}

export default AppError;