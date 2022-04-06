import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videosRouter} from "./routes/videos-routes";
import {authMiddleware} from "./middlewares/auth-middleware";

const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(bodyParser())
app.use(authMiddleware)


app.use('/lesson_01/api/videos', videosRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
