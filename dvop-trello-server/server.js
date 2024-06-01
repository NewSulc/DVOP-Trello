import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from './prismaClient.js';

import { boards } from './data.js';

dotenv.config()

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}));

app.post("/user", async (req, res) => {
    const users = await prisma.user.findMany()
    if (users.some(user => user.username === req.body.username)) return res.status(409).send("A user with this username already exists")
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = { username: req.body.username, password: hashedPassword };

        await prisma.user.create({ data: newUser });
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
});

app.post("/user/login", async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        const user = users.find(user => user.username === req.body.username)
        if (user == null) return res.status(400).send("A user with this username doesn't exist")
        if (!await bcrypt.compare(req.body.password, user.password)) res.status(401).send('Wrong password')
        const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).send({ accessToken: accessToken })
    } catch {
        res.status(500).send()
    }
});

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

app.get("/board/:boardid", (req, res) => {
    if (boards[req.params.boardid] != null) res.send(boards[req.params.boardid]);
    else {
        res.status(404)
        res.send("Board not found")
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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(8080, () => {
    console.log("Listening on 8080");
});