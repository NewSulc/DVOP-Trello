import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import prisma from './prismaClient.js';

import { boards } from './data.js';

import userRoutes from './routes/User.js';
import projectRoutes from './routes/Project.js';

import { authenticateToken } from './token.js'

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}));

app.use("/user", userRoutes)

app.use("/project", projectRoutes)

app.get("/board/:boardid", authenticateToken, async (req, res) => {
    try {
        const lists = await prisma.list.findMany({
            where: {
                board_id: Number(req.params.boardid)
            }
        })

        res.send(lists)
    } catch {
        res.status(500).send()
    }
});

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

app.post("/board/:boardid/list/:listid/task", (req, res) => {
    if (boards[req.params.boardid] != null) {
        if (boards[req.params.boardid].list[req.params.listid] != null) {
            let newId = Math.floor(Math.random() * 9000000000) + 1000000000;

            boards[req.params.boardid].list[req.params.listid].task[newId] = {
                id: newId,
                name: req.body.taskName
            }
            res.status(201)
            res.send(boards[req.params.boardid])
        }
        else {
            res.status(404)
            res.send("List not found")
        }
    }
    else {
        res.status(404)
        res.send("Board not found")
    }
});

app.patch("/board/:boardid/list/:listid/task/:taskid", (req, res) => {
    if (boards[req.params.boardid] != null) {
        if (boards[req.params.boardid].list[req.params.listid] != null) {
            if (boards[req.params.boardid].list[req.params.listid].task[req.params.taskid] != null) {

                boards[req.params.boardid].list[req.params.listid].task[req.params.taskid].name = req.body.taskName;

                res.status(200)
                res.send(boards[req.params.boardid])
            }
            else {
                res.status(404)
                res.send("Task not found")
            }
        }
        else {
            res.status(404)
            res.send("List not found")
        }
    }
    else {
        res.status(404)
        res.send("Board not found")
    }
});

app.listen(8080, () => {
    console.log("Listening on 8080");
});