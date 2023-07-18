import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis } from "./data/data.js";

// Configuraations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/kpi", kpiRoutes);

// MongoDB Connection
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async() => {
    app.listen(port, () => 
        console.log(`Server is running on port ${port}`)
    );
// add data one time only
    // await mongoose.connection.db.dropDatabase();
    // await KPI.insertMany(kpis);
}).catch((err) => {
    console.log(`${err} :did not connect`);
});

