import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose,{Schema} from 'mongoose'
import { AvailableUserRoles, UserRolesEnum } from '../../constants'

export const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"]      
    },
    refreshToken:{
        type:String,
    },
    role:{
        type:String,
        enum:AvailableUserRoles,
        default:UserRolesEnum.USER,
        required:true
    }

},
{
    timestamps:true,
    methods:{
        generateAccessToken(){
            return jwt.sign(
                {
                  _id: this._id,
                  email: this.email,
                  username: this.username,
                  role: this.role,
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
              );       
            },
        generateRefreshToken(){
            return jwt.sign(
                {
                  _id: this._id,
                },
                process.env.REFRESH_TOKEN_SECRET as string ,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
              );
        },
       async isPasswordCorrect(password:string){
        return await bcrypt.compare(password, this.password);
       }
    }
}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

export const User = mongoose.model("User",userSchema)
