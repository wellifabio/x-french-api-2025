const express = require('express')
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express')

const app = express()
const port = process.env.PORT || 3000
const routes = require('./src/routes')
const swaggerDoc = require('./swagger.json')

app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.use('/api/', express.static(path.join(__dirname, "./files")))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(port, () => {
    console.log(`Server response in:\nhttp://{{BASE_URL}}:{{SERVICE_PORT}}\nhttp://localhost:${port}/api\nhttp://localhost:${port}/swagger`)
})