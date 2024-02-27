import jwt from 'jsonwebtoken'
import { UserRolesEnum } from '../../constants'
import { User } from '../../models/auth/user.models'
import { ApiError } from '../../utils/ApiError'
import { ApiResponse } from '../../utils/ApiResponse'
import { asyncHandler } from '../../utils/asyncHandler'
export const generateAccessAndRefreshTokens = async (userId:any)=>{
    try{
        const user = await User.findById(userId);
        if(user){
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();
            user.refreshToken = refreshToken
            await user.save({validateBeforeSave:false});
            return {accessToken,refreshToken};

        }
    }
    catch(error){
        throw new ApiError(
            500,
            "Something went wrong while generating the access token"

        )
    }
}

export const registerUser = asyncHandler(async (req,res)=>{
    const { email, username, password, role } = req.body;
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
      });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists", []);
      }
    const user = await User.create({
        email,
        password,
        username,
        role: role || UserRolesEnum.USER,
      });
    await user.save();
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
      }
    
      return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { user: createdUser },
          "Users registered successfully and verification email has been sent on your email."
        )
      );
})

export const loginUser = asyncHandler(async (req, res) => {
    const {  email, password } = req.body;
  
    if ( !email) {
      throw new ApiError(400, " email is required");
    }
  
    const user = await User.findOne({
      $or: [{ email }],
    });
    
  
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    const tokens = await generateAccessAndRefreshTokens(user._id);
    let refreshToken,accessToken;
    if(tokens?.accessToken && tokens.refreshToken){
        refreshToken = tokens.refreshToken;
        accessToken = tokens.accessToken;
    }
    
    // get the user document ignoring the password and refreshToken field
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken "
    );
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken }, // send access and refresh token in response if client decides to save them by themselves
          "User logged in successfully"
        )
      );
  });

  const logoutUser = asyncHandler(async (req, res) => {
    // if(req?.user?._id){

  
    if(req.user as any){

    }

    // await User.findByIdAndUpdate(
    //   req.user._id,
    //   {
    //     $set: {
    //       refreshToken: undefined,
    //     },
    //   },
    //   { new: true }
    // );
  

  
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User logged out"));
  });
  

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }
  
    try {
      const decodedToken= jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      if ( typeof decodedToken !=="string" &&  '_id' in decodedToken && typeof decodedToken._id === 'string') {
        const user =  await User.findById(decodedToken._id )
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
          }
        
          if (incomingRefreshToken !== user?.refreshToken) {
            // If token is valid but is used already
            throw new ApiError(401, "Refresh token is expired or used");
          }

          const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          };
      
          const tokens =  await generateAccessAndRefreshTokens(user._id);
      
          let newRefreshToken,accessToken;
          if(tokens?.accessToken && tokens.refreshToken){
              newRefreshToken = tokens.refreshToken;
              accessToken = tokens.accessToken;
          }
          return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
              new ApiResponse(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "Access token refreshed"
              )
            );

        
    } 


   
    }
     catch (error) {
        if( error &&  typeof error == "object" && ("message" in error)   ){
            throw new ApiError(401, error.message as string);
        }
        else{
            throw new ApiError(401, "Invalid refresh token");

        }
    }
  });
  