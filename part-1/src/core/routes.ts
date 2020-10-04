import express from 'express';
import cors from 'cors';

import { listProducts, insertProducts, deleteProducts } from './controller';

const router = express.Router();

router.use(express.json({ limit: '200mb' }));
router.use(cors({ origin: true }));

router.get('/', async (req, res, next) => {
    try {
        const result = await listProducts();
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const result = await insertProducts(data);
        return res.send(result);
    } catch (err) {
        if (err.message === 'Duplicate value') {
           return  res.status(403).send({ message: err.message });
        }
        next(err);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const result = await deleteProducts();
        return res.send(result);
    } catch (err) {
        next(err);
    }
});

export default router;