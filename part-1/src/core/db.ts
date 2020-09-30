import { Db, MongoClient } from 'mongodb';
import { database } from './config';

const client = new MongoClient(database.uri, { useNewUrlParser: true });
let db: Db;

async function connect() {
    await client.connect();
    db = client.db(database.dbName);
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