import express from "express";
import cors from "cors";

//Import your new routes file
import jobRoutes from "./routes/job.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// The POST route in job.js will now be accessible at POST /job
app.use("/", jobRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});