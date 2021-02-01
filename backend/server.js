import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import connectDB from './config/db.js'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'

//Routes
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import challengeRoutes from './routes/challengeRoute.js'

dotenv.config()

connectDB()
const app = express()
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//directories
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/Frontend/build')))

//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'))
//     )
// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running....')
//     })
// }

app.use('/users', userRoutes)
app.use('/category', categoryRoutes)
app.use('/challenge', challengeRoutes)

//Error Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))