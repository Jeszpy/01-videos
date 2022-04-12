import {videosArray} from "./db";

export type VideosType = {
    id: number
    title: string
    author: string
}

export const videosRepository = {
    getVideos(): VideosType[] {
        return videosArray
    },
    getVideoById(id: number) {
        return videosArray.find((v) => v.id === id)
    },
    deleteVideoById(id: number) {
        for (let i=0;  i < videosArray.length; i++){
            if (videosArray[i].id === id){
                videosArray.splice(i, 1)
            }
        }
    },
    updateVideoById(id: number, title: string) {
        let video = videosArray.find((v) => v.id === id)
        if (video){
            video.title = title
            return true
        } else {
            return false
        }
    },
    createVideo(title: string) {
        const id = +new Date()
        const newVideo = {
            id: id,
            title: title,
            author: 'it-incubator.eu',
        }
        if (newVideo) {
            videosArray.push(newVideo)
            return newVideo
        }
    }
}