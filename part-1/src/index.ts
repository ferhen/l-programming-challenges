import express from 'express';
import router from './core/routes';

const app = express();

app.use(express.json({ limit: '200mb' }));
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
