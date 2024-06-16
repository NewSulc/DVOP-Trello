import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import prisma from './prismaClient.js';

import { boards } from './data.js';

import userRoutes from './routes/User.js';

import { authenticateToken } from './token.js'

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}));

app.use("/user", userRoutes)

app.get("/project", authenticateToken, async (req, res) => {
    const userProjects = await prisma.user_Project.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            Project: true,
        },
    });

    res.send(userProjects.map(userProject => userProject.Project))
});

app.post("/project", authenticateToken, async (req, res) => {
    try {
        const newProject = await prisma.project.create({ data: req.body })
        await prisma.user_Project.create({
            data: {
                user_id: req.user.id,
                project_id: newProject.id
            }
        });
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
});

app.post("/project/:projectid/board", authenticateToken, async (req, res) => {
    try {
        await prisma.board.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                project_id: Number(req.params.projectid)
            }
        });
        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

app.get("/project/:projectid", authenticateToken, async (req, res) => {
    try {
        const boards = await prisma.board.findMany({
            where: {
                project_id: Number(req.params.projectid)
            }
        })

        res.send(boards)
    } catch {
        res.status(500).send()
    }
});

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