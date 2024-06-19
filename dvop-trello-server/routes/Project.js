import express from 'express';
import prisma from '../prismaClient.js';

import { authenticateToken } from '../token.js';

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    const userProjects = await prisma.user_Project.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            Project: true,
        },
    });
    console.log(userProjects.map(userProject => userProject.Project))
    res.send(userProjects.map(userProject => userProject.Project))
});

router.post("/", authenticateToken, async (req, res) => {
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

router.post("/:projectid", authenticateToken, async (req, res) => {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: Number(req.params.projectid),
            },
        });

        if (project) {
            const user_project = await prisma.user_Project.findFirst({
                where: {
                    user_id: Number(req.user.id),
                    project_id: Number(req.params.projectid),
                },
            });

            if (!user_project) {
                await prisma.user_Project.create({
                    data: {
                        user_id: Number(req.user.id),
                        project_id: Number(req.params.projectid),
                    }
                })
                res.status(200).send()
            }
            else res.send(409).send("User already has this project")
        } else res.send(404).send("Project not found")
    } catch {
        res.status(500).send()
    }
})

router.post("/:projectid/board", authenticateToken, async (req, res) => {
    try {
        await prisma.board.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                color: req.body.color,
                project_id: Number(req.params.projectid)
            }
        });
        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

router.get("/:projectid", authenticateToken, async (req, res) => {
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

router.patch("/:projectid", authenticateToken, async (req, res) => {
    try {
        await prisma.project.update({
            where: {
                id: Number(req.params.projectid)
            },
            data: {
                name: req.body.name,
                description: req.body.description
            }
        });
        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

router.delete("/:projectid", authenticateToken, async (req, res) => {
    try {
        await prisma.project.delete({
            where: {
                id: Number(req.params.projectid)
            }
        });
        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

export default router;