import hash from 'object-hash';
import { insertDocuments, listDocuments, deleteDocuments } from './db';
import { get, set } from './cache';

export const listProducts = async () => {
    return await listDocuments('products');
}

export const insertProducts = async (products: any | any[]) => {
    if (!Array.isArray(products)) {
        products = [products];
    }
    const objHash = hash(products);
    if (await get(objHash))
        throw new Error('Duplicate value');
    await set(objHash, true);
    return await insertDocuments('products', products);
}

export const deleteProducts = async() => {
    return await deleteDocuments('products');
}