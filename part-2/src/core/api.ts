import fetch from 'node-fetch';

export async function apiValidator(url: string) {
    const fetchResult = await fetch(url, { method: 'GET' });
    return fetchResult.status === 200;
}