import fetch from 'node-fetch';
import { v4 } from 'uuid';


test('Test Duplicates Prevention - Sync requests', async () => {
    const id = v4();
    const testObj = { _id: id }

    const firstResult = await fetch('http://api:5000/', {
        method: 'POST',
        body: JSON.stringify(testObj),
        headers: { 'Content-Type': 'application/json' }
    });
    expect(await firstResult.json()).toStrictEqual(
        {
            insertedCount: 1, 
            insertedIds: {"0": id},
            ops: [testObj],
            result: {"n": 1, "ok": 1}
        }
    );
    expect(firstResult.status).toEqual(200);

    const secondResult = await fetch('http://api:5000/', {
        method: 'POST',
        body: JSON.stringify(testObj),
        headers: { 'Content-Type': 'application/json' }
    });
    expect(await secondResult.json()).toStrictEqual(
        {
            message: 'Duplicate value'
        }
    );
    expect(secondResult.status).toEqual(403);
});

test('Test Duplicates Prevention - Async requests', async () => {
    const uuid = v4();
    const testObj = { _id: uuid };
    const nRequests = 10;

    const requests = [];
    for (let index = 0; index < nRequests; index++) {
        requests.push(
            fetch('http://api:5000/', {
                method: 'POST',
                body: JSON.stringify(testObj),
                headers: { 'Content-Type': 'application/json' }
            })
        );
    }

    const fetchResults = await Promise.all(requests);
    const results = await Promise.all(fetchResults.map(x => x.json()));

    const duplicatedResults = results.filter(x => x.message === 'Duplicate value');
    const successResult = results.filter(x => x.insertedCount === 1);

    expect(duplicatedResults.length).toStrictEqual(nRequests - 1);
    expect(successResult.length).toStrictEqual(1);
});
