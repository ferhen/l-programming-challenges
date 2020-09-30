import redis from 'redis';
import { promisify } from 'util';
import { cache } from './config';

const client = redis.createClient(cache.uri);

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);

export const set = async (key: string, value: any) => {
    await setAsync(key, cache.expireDuration, value);
}

export const get = async (key: string) => {
    return await getAsync(key);
}
