const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { v4: uuidv4 } = require("uuid")

const create = async (req, res) => {
    try {
        req.body.diary_id = uuidv4()
        const diary = await prisma.diary.create({
            data: req.body
        });
        res.status(201).json(diary)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar diary', details: error.message })
    }
}

const read = async (req, res) => {
    try {
        const diaries = await prisma.diary.findMany()
        res.json({ msg: "Success", dados: diaries });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    read
};