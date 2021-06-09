import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import routes from './routes'

const app = express();
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', routes.users)
app.use('/customers', routes.customers)

app.listen(process.env.PORT, () => {
    return console.log(`server is listening on ${process.env.PORT}`);
});



