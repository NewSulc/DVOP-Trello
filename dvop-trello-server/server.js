import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import prisma from './prismaClient.js';

import { boards } from './data.js';

import userRoutes from './routes/User.js';
import projectRoutes from './routes/Project.js';
import boardRoutes from './routes/Board.js';

import { authenticateToken } from './token.js'

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}));

app.use("/user", userRoutes)

app.use("/project", projectRoutes)

app.use("/board", boardRoutes)

app.get("/list/:listId", authenticateToken, async (req, res) => {
    try {
        const lists = await prisma.task.findMany({
            where: {
                list_id: Number(req.params.listId)
            }
        })

        res.send(lists)
    } catch {
        res.status(500).send()
    }
});

app.post("/list/:listId/task", authenticateToken, async (req, res) => {
    try {
        const lists = await prisma.task.create({
            data: {
                name: req.body.name,
                list_id: Number(req.params.listId)
            }
        });

        res.send(lists)
    } catch {
        res.status(500).send()
    }
});

app.listen(8080, () => {
    console.log("Listening on 8080");
});