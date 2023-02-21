import { app } from './app';

const start = async () => {
  console.log('Starting up ......');

  const PORT = 3003;
  app.listen(PORT, () => {
    console.log(`Payment app is listening at port ${PORT}!!!!!!`);
  });
};

start();
