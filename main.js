import express from 'express';
import { handler as ssrHandler } from './server/entry.mjs';

const app = express();
app.get('/trang-chu', async (req, res, next) => {
    req.url = '/vi/home';
    next();
});
app.get('/home-page', async (req, res, next) => {
    req.url = '/en/home';
    next();
});
app.use(express.static('client/'))
app.use(ssrHandler);
app.listen(80);