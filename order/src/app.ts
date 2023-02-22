import express from 'express';

import { json } from 'body-parser';

//router
import { helloRouter } from './routes/order.route';
import { codesePool, query } from './configs/database.config';

const app = express();
const createTable = async () => {
    const createTableSql = "create table if not exists `order` (id int, orderName varchar(256))"
    return await query(codesePool, createTableSql)
}
createTable()
app.set('trust proxy', true); //trust HTTPS connection
app.use(json());

//api
app.use(helloRouter);

export { app };
