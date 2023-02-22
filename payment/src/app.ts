import express from 'express';

import { json } from 'body-parser';

//router
import { helloRouter } from './routes/payment.route';
import { codesePool, query } from './configs/database.config';

const app = express();
const createTable = async () => {
    const createTableSql = "create table if not exists `payment` (id int, paymentName varchar(256))"
    return await query(codesePool, createTableSql)
}
createTable()
app.set('trust proxy', true); //trust HTTPS connection
app.use(json());

//api
app.use(helloRouter);

export { app };
