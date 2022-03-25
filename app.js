const express = require('express');
const app = express();

//libs
require('dotenv').config();

//modules
const connectDB = require('./database/connectDB')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(express.json())

// app.get('/', (req,res) => {
//     res.status(200).send("Learning english")
// })

//Routes
app.use('/api/v1/users', authRouter)
app.use('/api/v1/users', userRouter)

//middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

async function start(){
    try{
        await connectDB(process.env.mongoURI)
        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}`)
        })
    }catch(error){
        console.log("error", error)
    }
}

start()
