const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db.js')
const router = require('./routes/index.js')


const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', router)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running localhost:${PORT}`)
    })
    console.log('connect to database')
}).catch((error) => {
    console.log(error)
})
