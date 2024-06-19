import express from 'express';
import prisma from '../prismaClient.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { authenticateToken } from '../token.js';
const router = express.Router();

dotenv.config()

router.post("/", async (req, res) => {
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

router.patch("/", authenticateToken, async (req, res) => {
    const users = await prisma.user.findMany()
    if (users.some(user => user.username === req.body.newUsername)) return res.status(409).send("A user with this username already exists")
    try {
        await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                username: req.body.newUsername,
            },
        });
        res.status(200).send()
    } catch {
        res.status(500).send()
    }
});

router.patch("/password", authenticateToken, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await prisma.user.update({
            where: {
                id: req.user.id
            },
            data:{
                password: hashedPassword
            }
        })
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

router.post("/login", async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        const user = users.find(user => user.username === req.body.username)
        if (user == null) return res.status(400).send("A user with this username doesn't exist")
        if (!await bcrypt.compare(req.body.password, user.password)) res.status(401).send('Wrong password')
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).send({ accessToken: accessToken })
    } catch {
        res.status(500).send()
    }
});

router.get("/", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        res.status(200).send({ username: user.username, id: user.id })
    } catch {
        res.status(500).send()
    }
});

export default router;