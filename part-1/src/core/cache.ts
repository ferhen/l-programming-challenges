import redis from 'redis';
import Redlock from 'redlock';
import { promisify } from 'util';
import { cache } from './config';

const client = redis.createClient(cache.uri);
const redlock = new Redlock([client]);

const resource = 'lock:products';
const ttl = 1000;

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);
const flushAllAsync = promisify(client.flushall).bind(client);

export const set = async (key: string, value: any) => {
    const lock = await redlock.lock(resource, ttl);
    await setAsync(key, cache.expireDuration, value);
    return await lock.unlock();
}

export const get = async (key: string) => {
    const lock = await redlock.lock(resource, ttl);
    const result = await getAsync(key);
    await lock.unlock();
    return result;
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