/**
 * controller.js
 * This class utilizes the main mongoose methods to create personalized versions:
 *      Methods for put, update, find, and delete
 */


var Userdb = require('../model/model')

// create and save new user 
exports.create = (req, res) => {
    // validate request, if req has no body just exit
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        board_ID: req.body.board_ID,
        time_in: req.body.time_in,
        time_out: req.body.time_out
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('../')
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "Some unknown error occured while creating a create operation"
            });
        });
}

// retreive and return all users / retreive return single user 
exports.find = (req, res) => {
    // If a query id is present, pass it in as the only user to find
    if (req.query.id){
        const id = req.query.id
        Userdb.findById(id)
            .then(data => {
                if (!data){
                    res.status(404).send({message : "User with ID %s does not exist", id})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message : "Error retrieving user with ID %s", id})
            })
    }else{ // else, return all users
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retreiving user information"})
        })
    }
}

// update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body){
        return res  
            .status(400)
            .send({message : "Data to update cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data){
                res.status(404).send({message:"cannot update user with %s. User may not exist", id})
            } else{
                res.send(data)              
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error updating user information"})
        })
}

// delete user with specified user ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data){
                res.status(404).send({message:"Cannot delete user %s. Try a different ID", id})
            } else{
                res.send({
                    message : "User was successfully deleted"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message : "Could not delete user with id %s", id
            })
        })
}