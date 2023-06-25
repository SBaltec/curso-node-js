 const express=require('express');
 
 const {usersController} = require('./controller');
 
 const router= express.Router();

 module.exports.UsersAPI= (app) =>  {
   router
   .get('/:id', usersController.getuser)
   .get('/', usersController.getusers)
   .post('/', usersController.createuser)
   .delete('/:id', usersController.deleteuser)
   .put('/:id', usersController.updateuser)


   app.use('/api/users',router)
 }