export async function limitValuesWithValidation(map: [any: any[]], key: any, value: any, validator: (input: any) => Promise<any>, maxNumber = 3) {
    const currentNumber = map[key]?.length ?? 0;

    if (currentNumber === maxNumber) {
        return;
    }

    const isValidated = await validator(value);
    if (!isValidated) {
        return;
    }

    if (currentNumber > 0) {
        map[key].push(value);
    } else {
        map[key] = [value];
    }
}

export function mapToNDJSON(productMap: [string: string[]]) {
    let result = '';
    for (let key in productMap) {
        result += `{"productId": "${key}", "images": ["${productMap[key].join('", "')}"]}\n`;
    }
    return result;
}
