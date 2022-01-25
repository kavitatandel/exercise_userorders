const ordersRouters = require('express').Router();
const connection = require('../conf');

//get all users
ordersRouters.get('/', (request, response) => {
    connection.query("SELECT orders.id,price,date,CONCAT(first_name,' ',last_name) AS name from orders join users on orders.user_id=users.id", (err, results) => {
        if (err) throw err
        response.send(results);
    })

})

//get users by id
ordersRouters.get('/:id', (request, response) => {
    const { id } = request.params
    connection.query("SELECT orders.id,price,date,CONCAT(first_name,' ',last_name) AS name from orders join users on orders.user_id=users.id where orders.id =$1", [id])
        .then(data => response.json(data))
        .catch(error => response.sendStatus(404))
})

//create new user
ordersRouters.post('/', (request, response) => {
    const { price, date, user_id } = request.body
    connection.query("INSERT INTO orders(price,date,user_id) values($1,$2,$3)", [price, date, user_id])
        .then(data => response.status(201).json(data))
        .catch(error => response.sendStatus(404));
})

//edit user
ordersRouters.put('/:id', (request, response) => {
    const { id } = request.params;
    const { price, date, user_id } = request.body
    //const { newUser } = request.body
    connection.query("UPDATE orders SET price=$1,date=$2,user_id=$3 where id=$4", [price, date, user_id, id])
        .then(data => response.status(201).json(data))
        .catch(error => response.sendStatus(404));
})

//get users by id
ordersRouters.delete('/:id', (request, response) => {
    // const { id } = request.params;
    const id = request.params.id;
    connection.query("DELETE FROM orders where id=$1", [id])
        .then(data => response.json(data))
        .catch(error => response.sendStatus(404))
})

module.exports = ordersRouters;