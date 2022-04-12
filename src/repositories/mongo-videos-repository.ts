// import {videosArray} from "./db";
import {videosCollection} from "./mongo-db";

export type VideoType = {
    id: number
    title: string
    author: string
}

export const videosRepository = {
    async getVideos(): Promise<VideoType[]> {
        return await videosCollection.find({}).toArray()
    },
    async getVideoById(id: number): Promise<VideoType | null> {
        return await videosCollection.findOne({id: id})
    },
    async createVideo(title: string): Promise<VideoType> {
        const id = +new Date()
        const newVideo = {
            id: id,
            title: title,
            author: 'it-incubator.eu',
        }
        await videosCollection.insertOne(newVideo)
        return newVideo
    },
    async updateVideoById(id: number, title: string): Promise<boolean> {
        const result = await videosCollection.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1
    },
    async deleteVideoById(id: number): Promise<boolean> {
        const result = await videosCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllVideos(): Promise<boolean> {
        try {
            await videosCollection.deleteMany({})
            return true
        } catch (e) {
            return false
        }
    }
}