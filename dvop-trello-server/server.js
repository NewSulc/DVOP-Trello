import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/User.js';
import projectRoutes from './routes/Project.js';
import boardRoutes from './routes/Board.js';
import listRoutes from './routes/List.js';
import taskRoutes from './routes/Task.js';

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}));

app.use("/user", userRoutes)

app.use("/project", projectRoutes)

app.use("/board", boardRoutes)

app.use("/list", listRoutes)

app.use("/task", taskRoutes)

app.listen(8080, () => {
    console.log("Listening on 8080");
});