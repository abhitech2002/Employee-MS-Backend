const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const OragRoutes = require('./routes/organization.routes')

dotenv.config()

const app = express()
app.use(express.json())


const MONGODB_URI = process.env.MONGODB_URI
mongoose
    .connect(MONGODB_URI)
    .then( () => {
        console.log("MongoDB connected")
    })
    .catch((error) => console.log(error))


app.use('/api/register', OragRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
    console.log(`Server Started on server ${PORT}....`)
})