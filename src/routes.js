const express = require('express')
const router = express.Router()

const User = require('./controllers/user')
const Diary = require('./controllers/diary')
const Collection = require('./controllers/collection')
const { validate } = require('./middleware/auth')

router.get('/', (req, res) => {
    res.json({
        titulo: "X-French API",
        versao: "1.0.0",
        rotas: [
            { user: "/api/users" },
            { user: "/api/users/create" },
            { user: "/api/users/signin" },
            { diary: "/api/diary" },
            { collection: "/api/diary/collection" },
            { files: "/api/{{caminho}}" }
        ]
    })
})

router.get('/users', validate, User.read)
router.post('/users/register', User.create)
router.post('/users/signin', User.login)

router.get('/diary', Diary.read)
router.post('/diary', Diary.create)
router.put('/diary/collection', validate, Collection.create)
router.get('/diary/collection', Collection.read)

module.exports = router