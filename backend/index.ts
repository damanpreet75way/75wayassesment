import dotenv from 'dotenv'
import { app } from './app';
import connectDB from './db';
dotenv.config({
    path:"./.env"
})
import { Model ,Document,HydratedDocument} from 'mongoose';
import { User } from './models/auth/user.models';
import { userSchema } from './models/auth/user.models';
declare global {
    namespace Express {
        interface Request {
            user:any
        }
    }
}


const startServer = ()=>{
    app.listen(process.env.PORT || 8080, () => {
        console.log("⚙️  Server is running on port: " + process.env.PORT);
    }
    )
}

connectDB().then(()=>{
    startServer()
}).catch((err)=>{
    console.log("database connetion error " )
})