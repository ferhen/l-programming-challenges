import fs from 'fs';
import split2 from 'split2';
import zlib from 'zlib';
import tar from 'tar-stream';
import { Readable } from 'stream';

import { limitValuesWithValidation, mapToNDJSON } from './core/main';
import { apiValidator } from './core/api';

const productMap = {} as [string: string[]];
const extract = tar.extract();

async function process(readable: Readable, validator: (input: any) => Promise<any>) {
    for await (const { productId, image } of readable) {
        await limitValuesWithValidation(productMap, productId, image, validator);
    }
}

extract.on('entry', (header, stream, cb) => {
    process(
        stream.pipe(split2(JSON.parse)),
        apiValidator
    );

    stream.on('end', () => {
        cb();
    });

    stream.resume();
});

extract.on('finish', () => {
    fs.writeFile('output-dump', mapToNDJSON(productMap), err => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});

fs.createReadStream('./mock/input-dump.tar.gz')
    .pipe(zlib.createGunzip())
    .pipe(extract);
