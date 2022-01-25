
const express = require('express');
const app = express();

const port = process.env.PGPORT || 3002;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

require("dotenv").config();

//access users routers
const usersRouter = require('./routes/usersRouter');
app.use('/api/users', usersRouter)

//access orders routers
const ordersRouters = require('./routes/ordersRouters');
app.use('/api/orders', ordersRouters)


app.listen(port, console.log(`Server is listening on port ${port}`));
