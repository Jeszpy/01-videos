import {MongoClient} from 'mongodb'
import {VideoType} from "./mongo-videos-repository";

const mongoUri =
//     process.env.mongoURI = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
    'mongodb+srv://sysdba:root@backend.xwwaa.mongodb.net/videos?retryWrites=true&w=majority'


const client = new MongoClient(mongoUri);

const db = client.db("videos")
export const videosCollection = db.collection<VideoType>('videos-management')

export async function runDb() {
    try {
        await client.connect();
        await client.db("videos").command({ ping: 1 });
        console.log("Connected successfully to mongo server");
    } catch (e) {
        console.log("Cant connect to mongo server:", e);
        await client.close();
    }
}
