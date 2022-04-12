import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videosRouter} from "./routes/videos-routes";
import {authMiddleware} from "./middlewares/auth-middleware";
import {runDb} from "./repositories/mongo-db";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())// app.use(bodyParser())
// app.use(authMiddleware) // TODO: auth middleware is clear


app.use('/lesson_01/api/videos', videosRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
})

const start = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`)
    })
}

start()