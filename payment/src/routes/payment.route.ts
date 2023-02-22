import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
import { initConsumer } from '../consumers';
import { SyncConsumeOrderResult } from '../consumers/sync-read-order-queue.consumer';
import { pushToQueue } from '../producers';
const router = express.Router();

router.post('/api/payment', async (req: Request, res: Response) => {
  let { id, paymentName } = req.body;
  paymentName = paymentName + 'payment';
  try {
    await initConsumer(SyncConsumeOrderResult)
    res.send({
      response_status: 1,
      message: 'Paid successful',
    });
    pushToQueue("successful", paymentName, id);
  } catch (error) {
    res.send({
      response_status: 1,
      message: 'Payment created failure',
    });
    pushToQueue("failure", paymentName, id);
  }
});
export { router as helloRouter };
