import request from 'supertest';
import app from '../src/core/server';
import { clearCache, shutdownCache } from '../src/core/cache';
import { disconnect } from '../src/core/db';

beforeEach(async () => {
    await clearCache();
    await request(app).delete('/');
});

test('GET - List products request', async () => {
    const result = await request(app).get('/');
    expect(result.body).toStrictEqual([]);
    expect(result.status).toEqual(200);
});

test('POST - Create product', async () => {
    const testObj = {
        _id: 1,
        msg: 'Test message'
    };
    const result = await request(app).post('/').send(testObj);
    expect(result.body).toStrictEqual(
        {
            insertedCount: 1, 
            insertedIds: {"0": 1},
            ops: [testObj],
            result: {"n": 1, "ok": 1}
        }
    );
    expect(result.status).toEqual(200);
});

test('DELETE - Delete all products', async () => {
    const deleteResult = await request(app).delete('/');
    expect(deleteResult.status).toEqual(200);
    const result = await request(app).get('/');
    expect(result.body).toStrictEqual([]);
});

afterAll(async () => {
    await request(app).delete('/');
    await shutdownCache();
    await disconnect();
});