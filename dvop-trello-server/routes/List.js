import express from 'express';
import prisma from '../prismaClient.js';

import { authenticateToken } from '../token.js';

const router = express.Router();

router.get("/:listId", authenticateToken, async (req, res) => {
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

router.delete("/:listId", authenticateToken, async (req, res) => {
    try {
        await prisma.list.delete({
            where:{
                id: Number(req.params.listId)
            }
        })

        res.send(200).send()
    } catch {
        res.status(500).send()
    }
});

router.post("/:listId/task", authenticateToken, async (req, res) => {
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

export default router;