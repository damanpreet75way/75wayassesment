import { HydratedDocument ,Document} from "mongoose";
import { User, userSchema } from "../models/auth/user.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken:any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
    const user = await User.findById(decodedToken?._id).select(
      "-username -password -refreshToken  "
    );
    if (!user){
      throw new ApiError(401, "Invalid access token");
    }
    
    req.user =user
  
    next();
  }   catch (error:any) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyPermission = (roles:string[] = []) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new ApiError(403, "You are not allowed to perform this action");
    }
  });