import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbconnection.js";
import { errorMiddleware } from "./middleware/error.js";
import router from "./routes/userRoutes.js";

export const app  = express();
config({path: "./config.env"});

// app.get('/', (req, res) => {
//   res.send('Easy Home website ');
// });

app.use(
    cors({
        origin : [process.env.FRONTEND_URL],
        methods : ["GET","POST","PUT","DELETE"],
        credentials : true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/homeeasy", router)
// removeUnverifiedAccounts();

connection();



app.use(errorMiddleware);