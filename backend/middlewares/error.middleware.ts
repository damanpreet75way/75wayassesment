import { NextFunction,Request,Response } from "express";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";


interface CustomError extends Error{
    statusCode?:number;
    errors:Error[];
}

export const errorHandler = (err: ApiError  | CustomError ,req:Request,res:Response,next:NextFunction) =>{
    let error  = err;
    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500;
        const message  = error.message || "Something Went Wrong";
        error = new ApiError(statusCode,message,error?.errors || [] ,err.stack)
        
    }
    const response ={
        ...error,
        message:error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    }

    return res.status(error.statusCode as number  ).json(response);
}


