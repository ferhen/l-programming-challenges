import { limitValuesWithValidation, mapToNDJSON } from "../src/core/main";

test('limitValuesWithValidation', async () => {
    const testInput = [
        {"productId": "pid1", "image": "http://localhost/1.png"},
        {"productId": "pid1", "image": "http://localhost/2.png"},
        {"productId": "pid1", "image": "http://localhost/7.png"},
        {"productId": "pid2", "image": "http://localhost/3.png"},
        {"productId": "pid1", "image": "http://localhost/1.png"},
        {"productId": "pid2", "image": "http://localhost/5.png"},
        {"productId": "pid2", "image": "http://localhost/6.png"},
        {"productId": "pid2", "image": "http://localhost/4.png"}
    ];
    const expectedOutput = {
        "pid1": ["http://localhost/1.png", "http://localhost/2.png", "http://localhost/7.png"],
        "pid2": ["http://localhost/3.png", "http://localhost/5.png", "http://localhost/6.png"]
    };
    const map = {} as [string: string[]];

    for (const input of testInput) {
        await limitValuesWithValidation(map, input.productId, input.image, async () => true);
    }

    expect(map).toEqual(expectedOutput);
});

test('mapToNDJSON', async () => {
    const testInput: any = {
        "pid1": ["http://localhost/1.png", "http://localhost/2.png", "http://localhost/7.png"],
        "pid2": ["http://localhost/3.png", "http://localhost/5.png", "http://localhost/6.png"]
    };
    const expectedOutput = `{\"productId\": \"pid1\", \"images\": [\"http://localhost/1.png\", \"http://localhost/2.png\", \"http://localhost/7.png\"]}
{\"productId\": \"pid2\", \"images\": [\"http://localhost/3.png\", \"http://localhost/5.png\", \"http://localhost/6.png\"]}
`;

    const result = mapToNDJSON(testInput);

    expect(result).toEqual(expectedOutput);
});

test('e2e', async () => {
    const testInput = [
        {"productId": "pid1", "image": "http://localhost/1.png"},
        {"productId": "pid1", "image": "http://localhost/2.png"},
        {"productId": "pid1", "image": "http://localhost/7.png"},
        {"productId": "pid2", "image": "http://localhost/3.png"},
        {"productId": "pid1", "image": "http://localhost/1.png"},
        {"productId": "pid2", "image": "http://localhost/5.png"},
        {"productId": "pid2", "image": "http://localhost/6.png"},
        {"productId": "pid2", "image": "http://localhost/4.png"}
    ];
    const expectedOutput = [
        {"productId": "pid1", "images": ["http://localhost/1.png", "http://localhost/2.png", "http://localhost/7.png"]},
        {"productId": "pid2", "images": ["http://localhost/3.png", "http://localhost/5.png", "http://localhost/6.png"]}
    ];
    const map = {} as [string: string[]];

    for (const input of testInput) {
        await limitValuesWithValidation(map, input.productId, input.image, async () => true);
    }

    const result = mapToNDJSON(map)
        .split('\n')
        .filter(x => x)
        .map(x => JSON.parse(x));

    expect(result).toEqual(expectedOutput);
});