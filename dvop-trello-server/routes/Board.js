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
                name: req.body.name,
                description: req.body.description,
                color: req.body.color
            }
        });
        res.status(200).send()
    } catch {
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

router.post("/:boardid/list", async (req, res) => {
    try {
        await prisma.list.create({
            data: {
                name: req.body.name,
                board_id: Number(req.params.boardid)
            }
        })

        res.status(201).send()
    } catch { 
        res.status(500).send()
    }
})

export default router;