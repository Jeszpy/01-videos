import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";
import {body, param, query} from 'express-validator';
import {inputValidatorMiddleware} from '../middlewares/input-validator-middleware'

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

videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videosRepository.getVideoById(id)
    if (video) {
        return res.send(video)
    } else {
        return res.send(404)
    }
})
    .get('/', (req: Request, res: Response) => {
        const videos = videosRepository.getVideos()
        return res.send(videos)
    })
    .post('/',
        body('title')
            .isLength({min: 1, max: 100})
            .isString()
            .withMessage('string 1-100 symbols'),
        // .matches(/^[\w ]*$/)
        // .withMessage('input not valid'),
        inputValidatorMiddleware,
        (req: Request, res: Response) => {
            const title = req.body.title
            const newVideo = videosRepository.createVideo(title)
            if (newVideo) {
                return res.status(201).send(newVideo)
            } else {
                return res.status(errorData.status).send(errorData)
            }
        })
    .put('/:id',
        body('title')
            .isLength({min: 1, max: 100})
            .isString()
            .withMessage('string 1-100 symbols'),
        inputValidatorMiddleware,
        (req: Request, res: Response) => {
            const id = +req.params.id
            const title = req.body.title
            const isVideoUpdated = videosRepository.updateVideoById(id, title)
            if (isVideoUpdated) {
                return res.send(204)
            } else {
                return res.status(404).send(errorData)
            }
        })
    .delete('/:id', (req: Request, res: Response) => {
        const id = +req.params.id
        const video = videosRepository.getVideoById(id)
        if (!video){
            return res.status(404).send(errorData)
        } else {
            videosRepository.deleteVideoById(id)
            const video = videosRepository.getVideoById(id)
            if (!video) {
                return res.send(204)
            }
        }
    })