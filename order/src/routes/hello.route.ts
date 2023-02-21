import axios from 'axios';
import express, { Request, Response } from 'express';
import { codesePool, query } from '../configs/database.config';
import { pushToQueue } from '../producers';
const router = express.Router();

router.post('/api/order', async (req: Request, res: Response) => {
  let { id, orderName } = req.body;
  const paymentName = orderName;
  const deliveryName = orderName;
  orderName = orderName + ' order';

  const sqlOrder = `insert into \`order\` (id, orderName) values (?,?) `;

  const orderRes = await query(codesePool, sqlOrder, [id, orderName]);
  console.log(orderRes);
  if (orderRes) {
    pushToQueue("Ordered");
  }

  try {
    try {
      await axios.post('http://localhost:3003/api/payment', {
        id,
        paymentName,
      });
    } catch (errPayment) {
      console.log(errPayment);
      throw Error('Payment error');
    }

    try {
      await axios.post('http://localhost:3002/api/delivery', {
        id,
        deliveryName,
      });
    } catch (errDelivery) {
      console.log(errDelivery);
      throw Error('Delivery error');
    }
  } catch (err: any) {
    console.log(err);
    if (err.message == 'Payment error') {
      const sqlDeleteOrder = `delete from \`order\` where id='${id}'`;
      await query(codesePool, sqlDeleteOrder);
    }
  }

  res.send({
    response_status: 1,
    message: 'Order create successful',
  });
});
export { router as helloRouter };
