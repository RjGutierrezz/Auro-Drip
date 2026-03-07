import express from "express";
import cors from "cors";
import healthRouter from "./routes/health";
import clothingRouter from "./routes/clothing";

// express is a framework for node.js, designed to simplify the process of 
// building server-side applications
const app = express();

// this will allow frontend (5173) to call backend (4000)
app.use(cors());

// lets express read the JSON bodies from request
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/clothing", clothingRouter);

export default app;
