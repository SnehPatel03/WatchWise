import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import preferenceRoutes from "./Routes/preferenceRoutes.js";
dotenv.config();

const app = express();
const Port = 3000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://watchwise-hq.onrender.com"],
  }),
);
app.use("/", preferenceRoutes);

app.listen(Port, () => {
  console.log(`App is Listening on Port : ${Port}`);
});
