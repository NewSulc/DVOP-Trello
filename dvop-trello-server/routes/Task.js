import express from 'express';
import prisma from '../prismaClient.js';

import { authenticateToken } from '../token.js';

const router = express.Router();

router.patch("/:taskid", authenticateToken, async (req, res) => {
    try {
        await prisma.task.update({
            where: {
                id: Number(req.params.taskid)
            },
            data: {
                name: req.body.name
            }
        })

        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

router.delete("/:taskid", authenticateToken, async (req, res) => {
    try {
        await prisma.task.delete({
            where: {
                id: Number(req.params.taskid)
            }
        })

        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

export default router;