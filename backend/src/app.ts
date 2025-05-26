import  express from "express";
import cors from "cors";

import tasksRoute from "./routes/tasksRoute";
import {errorMiddleware} from "./middleware/errorMiddleware";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/tasks', tasksRoute)

app.use(errorMiddleware);

export default app;