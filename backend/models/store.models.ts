import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose,{Schema} from 'mongoose'

const storeSchema = new Schema({
   name:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    index:true
   },
   openTime:{
    type:Date,
   },
   closeTime:{
    type:Date,
   },
   numberOFEmployee:{
    type:Number,
    default:10
   }

},
{
    timestamps:true,

}
)



export const Store = mongoose.model("Store",storeSchema)
