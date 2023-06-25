const express = require('express')
 
const { SalesController } = require('./controller')
 
const router = express.Router()
 
module.exports.SalesAPI = (app) => {
  router
    .get('/', SalesController.getSales)
    // .get('/:id', SalesController.getSale)
    // .post('/', SalesController.createSale)
    // .post('/delete/:id', SalesController.deleteSale)
    // .post('/update/:id', SalesController.updateSale)
 
  app.use('/api/sales', router)
}