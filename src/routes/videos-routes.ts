import {Request, Response, Router} from 'express'
// import {videosRepository} from "../repositories/videos-repository";
import {videosRepository, VideoType} from "../repositories/mongo-videos-repository";
import {inputValidatorMiddleware} from '../middlewares/input-validator-middleware'
import {titleValidationParams} from "../common/validations/title-validation-params";

const errorData = {
    type: 'error',
    title: 'incorrect values',
    status: 400,
    detail: 'input values must be a string',
    instance: 'string',
    additionalProp1: 'string',
    additionalProp2: 'string',
    additionalProp3: 'string',
}

export const videosRouter = Router({})

videosRouter
    .get('/:id', async (req: Request, res: Response) => {
        const id = +req.params.id
        const video = await videosRepository.getVideoById(id)
        if (video) {
            return res.send(video)
        } else {
            return res.send(404)
        }
    })
    .get('/', async (req: Request, res: Response) => {
        const videos = await videosRepository.getVideos()
        return res.send(videos)
    })
    .post('/',
        titleValidationParams,
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {
            const title = req.body.title
            const newVideo: VideoType = await videosRepository.createVideo(title)
            return res.status(201).send(newVideo)
        })
    .put('/:id',
        titleValidationParams,
        inputValidatorMiddleware,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const title = req.body.title
            const isVideoUpdated = await videosRepository.updateVideoById(id, title)
            if (isVideoUpdated) {
                return res.send(204)
            } else {
                return res.status(404).send(errorData)
            }
        })
    .delete('/:id', async (req: Request, res: Response) => {
        const id = +req.params.id
        const isVideoDeleted = await videosRepository.deleteVideoById(id)
        if (isVideoDeleted) {
            return res.send(204)
        } else {
            return res.status(404).send(errorData)
        }
    })
    .delete('/', async (req: Request, res: Response) => {
        const isVideosDeleted = await videosRepository.deleteAllVideos()
        if (isVideosDeleted) {
            return res.send(204)
        } else {
            return res.status(404).send(errorData)
        }
    })