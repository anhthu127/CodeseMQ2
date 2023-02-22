import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
import { pushToQueue } from '../producers';
const router = express.Router();

router.post('/api/delivery', async (req: Request, res: Response) => {
  let { id, deliveryName } = req.body;
  deliveryName = deliveryName + 'delivery';
  try {
    const sqlOrder = `insert into delivery (id, deliveryName) values (?,?) `;
    await query(codesePool, sqlOrder, [id, deliveryName]);
    pushToQueue("successful", deliveryName, id)
    res.send({
      response_status: 1,
      message: 'Delivery create successful',
    });
  } catch (error) {
    pushToQueue("failure", deliveryName, id)
    res.send({
      response_status: 1,
      message: 'Delivery create failure',
    });
  }
});
export { router as helloRouter };
