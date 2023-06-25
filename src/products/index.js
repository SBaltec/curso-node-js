 const express=require('express');
 
 const {ProductsController} = require('./controller');
 
 const router= express.Router();

 module.exports.ProductsAPI= (app) =>  {
   router
   .get('/report', ProductsController.generatedReport)
   .get('/:id', ProductsController.getProduct)
   .get('/', ProductsController.getProducts)
   .post('/', ProductsController.createProduct)
   .delete('/:id', ProductsController.deleteProduct)
   .put('/:id', ProductsController.updateProduct)


   app.use('/api/products',router)
 }