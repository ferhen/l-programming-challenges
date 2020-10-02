import redis from 'redis';
import { promisify } from 'util';
import { cache } from './config';

const client = redis.createClient(cache.uri);

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);
const flushAllAsync = promisify(client.flushall).bind(client);

export const set = async (key: string, value: any) => {
    await setAsync(key, cache.expireDuration, value);
}

export const get = async (key: string) => {
    return await getAsync(key);
}

export const clearCache = async () => {
    return await flushAllAsync();
}

export const shutdownCache = async () => {
    await new Promise((resolve) => {
        client.quit(() => {
            resolve();
        });
    });
    await new Promise(resolve => setImmediate(resolve));
}