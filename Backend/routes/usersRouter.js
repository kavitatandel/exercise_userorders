const usersRouters = require('express').Router();
const { request, response } = require('express');
const connection = require('../conf');

//get all users
usersRouters.get('/', (request, response) => {
    connection.query("Select * from users", (err, results) => {
        if (err) throw err
        response.send(results);
    })

})

//get users by id
usersRouters.get('/:id', (request, response) => {
    const { id } = request.params
    connection.query("Select * from users where id =$1", [id])
        .then(data => response.json(data))
        .catch(error => response.sendStatus(404))
})

//create new user
usersRouters.post('/', (request, response) => {
    const { first_name, last_name, age } = request.body
    //const { newUser } = request.body
    connection.query("INSERT INTO users(first_name,last_name,age) values($1,$2,$3)", [first_name, last_name, Number(age)])
        .then(data => response.status(201).json(data))
        .catch(error => response.sendStatus(404));
})

//edit user
usersRouters.put('/:id', (request, response) => {
    const { id } = request.params;
    const { first_name, last_name, age } = request.body
    //const { newUser } = request.body
    connection.query("UPDATE users SET first_name=$1,last_name=$2,age=$3 where id=$4", [first_name, last_name, Number(age), id])
        .then(data => response.status(201).json(data))
        .catch(error => response.sendStatus(404));
})

//get users by id
usersRouters.delete('/:id', (request, response) => {
    const { id } = request.params;
    connection.query("DELETE FROM users where id=$1", [id])
        .then(data => response.json('deleted'))
        .catch(error => response.sendStatus(404))
})

module.exports = usersRouters;