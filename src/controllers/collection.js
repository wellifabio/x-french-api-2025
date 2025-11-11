const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        const collection = await prisma.collection.create({
            data: req.body
        });
        delete collection.id
        res.json({ msg: "Success", dados: collection })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar collection', details: error.message })
    }
}

const read = async (req, res) => {
    try {
        const collections = await prisma.collection.findMany({
            select: {
                diary_id: true,
                favorite_datetime: true
            }
        })
        res.json({ msg: "Success", dados: collections })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    read
};