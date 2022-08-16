/**
 * render.js
 * This class is responsible for rendering each new page on various
 *  function calls: home, add user, update user
 */

const axios = require('axios');
const { response } = require('express');


exports.homeRoutes=(req, res)=>{
    // Make get request to api users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            console.log(response.data)
            res.render('index', {users: response.data});
        })
        .catch(err => {
            res.send(err)
        })
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    // get specific user from database
    axios.get('http://localhost:3000/api/users', {params: {id : req.query.id}})
        .then(function(userdata){
            res.render('update_user', {user : userdata.data})
        })
        .catch(err =>{
            res.send(err)
        })
}