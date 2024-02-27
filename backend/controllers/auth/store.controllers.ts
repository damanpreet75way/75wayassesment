import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { Store } from "../../models/store.models";
export const createStore = asyncHandler(async(req,res,next)=>{
    const {name,openTime,closeTime,numberOFEmployee} = req.body
    const store  = await  Store.create({
        name,
        openTime,
        closeTime,
        numberOFEmployee
    })
    await store.save();
    return res.status(201).json(
        new ApiResponse(200,"store created")
    )

})