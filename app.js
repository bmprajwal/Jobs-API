require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const authenticateUser = require('./middleware/authentication')

//connect db
const connectDB = require('./db/connect')
//routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)

//error handlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()