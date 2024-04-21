import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { boards } from './data.js';

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}));

app.get("/user/:userid", (req, res) => {
    res.send("User")
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
            else{
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