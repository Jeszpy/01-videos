import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser())

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

const errorData = {
    type: "error",
    title: "incorrect values",
    status: 400,
    detail: "input values must be a string",
    instance: "string",
    additionalProp1: "string",
    additionalProp2: "string",
    additionalProp3: "string"
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
})

app.get('/lesson_01/api/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

app.get('/lesson_01/api/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.post('/lesson_01/api/videos/', (req: Request, res: Response) => {
    const title = req.body.title
    if (typeof title !== "string") {
        res.status(errorData.status).send(errorData)
    } else {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator.eu'
        }
        if (newVideo) {
            videos.push(newVideo)
            res.status(201).send(newVideo)
        } else {
            res.status(errorData.status).send(errorData)
        }
    }
})

app.put('/lesson_01/api/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title
    if (typeof title !== "string") {
        res.status(errorData.status).send(errorData)
    } else {
        const video = videos.find(v => v.id === id)
        if (video) {
            video.title = req.body.title
            res.send(204)
        } else {
            res.status(404).send(errorData)
        }
    }
})

app.delete('/lesson_01/api/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)
    if (typeof video === "undefined") {
        res.status(errorData.status).send(errorData)
    } else {
        videos = videos.filter(v => v.id !== id)
        const video = videos.find(v => v.id === id)
        if (!video) {
            res.send(204)
        }
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})