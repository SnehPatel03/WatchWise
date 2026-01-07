import { json } from "express";
import express from "express";
import cors from 'cors'
import preferenceRoutes from './Routes/preferenceRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const Port = 3000;
app.use(express.json());
app.use(cors({
  origin: "https://watchwise-hq.onrender.com"
}));
app.use("/", preferenceRoutes)

app.listen(Port, () => {
    console.log(`App is Listening on Port : ${Port}`)
})