import type { NextFunction, Request, Response } from "express"

const auth = () =>{
    return async (req:Request, res:Response, next: NextFunction) =>{
        console.log(`This is protected route`)
        next()
    }
}