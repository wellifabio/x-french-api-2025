const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jsonwebtoken = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                userEmailAddress: req.body.userEmailAddress,
                userPassword: req.body.userPassword
            }
        })

        if (!user) {
            return res.status(401).json({ msg: 'Invalid email or password!' })
        } else {
            const token = jsonwebtoken.sign(
                {
                    email: user.userEmailAddress,
                },
                process.env.JWT_SECRET,
                { expiresIn: "60min" }
            );
            res.status(200).json({ msg: "Login bem-sucedido", dados: { auth_token: token } })
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

const create = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        delete user.userPassword
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar user', details: error.message })
    }
}

const read = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json({ msg: "Success", dados: users })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


module.exports = {
    login,
    create,
    read
};