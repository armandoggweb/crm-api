import 'dotenv/config'
import express from 'express';

const app = express();

app.listen(process.env.PORT, () => {
  return console.log(`server is listening on ${process.env.PORT}`);
});