import { Db, MongoClient } from 'mongodb';
import { database } from './config';

const client = new MongoClient(database.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db: Db;

const connect = async () => {
    await client.connect();
    db = client.db(database.dbName);
}

export const disconnect = async () => {
    await client.close();
}

export const insertDocuments = (collectionName: string, documents: any[]) => {
    const collection = db.collection(collectionName);
    return collection.insertMany(documents);
}

export const listDocuments = (collectionName: string) => {
    const collection = db.collection(collectionName);
    return collection.find({}).toArray();
}

export const deleteDocuments = (collectionName: string) => {
    const collection = db.collection(collectionName);
    return collection.deleteMany({});
}

(async () => await connect())();