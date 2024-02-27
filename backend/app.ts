import express,{Express} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from "express-session"
import morganMiddleware from 'morgan'
const app:Express = express()
import { errorHandler } from './middlewares/error.middleware'

// global middlewares
app.use(
    cors({
      origin:
        process.env.CORS_ORIGIN === "*" ? "*" : process.env.CORS_ORIGIN?.split(","),
        credentials: true,
    })
  );
  

// Rate limiter to avoid misuse of the service and avoid cost spikes
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//     keyGenerator: (req , res) => {
//       return req.clientIp  ; // IP address from requestIp.mw(), as opposed to req.ip
//     },
//     handler: (_, __, ___, options) => {
//       throw new ApiError(
//         options.statusCode || 500,
//         `There are too many requests. You are only allowed ${
//           options.max
//         } requests per ${options.windowMs / 60000} minutes`
//       );
//     },
//   });

// app.use(limiter)

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public")); // configure static file to save images locally

app.use(cookieParser());

// required for passport
app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET || "",
      resave: true,
      saveUninitialized: true,
    })
  ); 
app.use(morganMiddleware('combined'))


//user auth Routes 
import userRouter from './routes/auth/user.routes';
app.use( "/user",userRouter);

//sore Routes
import storeRouter from './routes/store.routes'
app.use('/store',storeRouter)


app.use(errorHandler);

export {app}