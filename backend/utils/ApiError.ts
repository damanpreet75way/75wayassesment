   class ApiError extends Error{
    /**
     * 
     */
    success:boolean
    data:any = null;
    statusCode:number ;
    errors:Error[];

    constructor(
        statusCode:number,
        message = "Something went Wrong",
        errors:Error[]=[],
        stack=""
    ){
        super(message);
        this.statusCode  = statusCode;
        this.data  = null;
        this.message = message;
        this.success  = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
          } else {
            Error.captureStackTrace(this, this.constructor);
          }
    }
}

export {ApiError}