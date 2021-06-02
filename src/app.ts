import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.listen(process.env.PORT, () => {
    return console.log(`server is listening on ${process.env.PORT}`);
});
