import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.mongoConnect, () =>
  console.log(`Connected to DB`)
);

import { generateUploadURL } from "./s3";
import CategoryRoutes from "../routes/Categories";
import UserRoutes from "../routes/User";
import StreamsRoutes from "../routes/Streams";

app.get("/api/s3", generateUploadURL);
app.use("/api/category", CategoryRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/streams", StreamsRoutes);

app.listen(5000, () => console.log("server up and running"));
