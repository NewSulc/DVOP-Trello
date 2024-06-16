import express from 'express';
import prisma from '../prismaClient.js';

import { authenticateToken } from '../token.js';

const router = express.Router();

router.get("/:boardid", authenticateToken, async (req, res) => {
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

router.patch("/:boardid", authenticateToken, async (req, res) => {
    try {
        await prisma.board.update({
            where: {
                id: Number(req.params.boardid)
            },
            data: {
                name: req.body.newName
            }
        });
        res.status(200).send()
    } catch{
        res.status(500).send()
    }
});

router.delete("/:boardid", authenticateToken, async (req, res) => {
    try {
        await prisma.board.delete({
            where: {
                id: Number(req.params.boardid)
            }
        });
        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

router.post("/:boardid/list/:listid/task", (req, res) => {
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

router.patch("/:boardid/list/:listid/task/:taskid", (req, res) => {
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

export default router;