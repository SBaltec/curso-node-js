
const createError=require('http-errors');
const debug=require('debug')('app:module-Sales-controller');
const {SalesService} = require('./services');
const {Response} = require('../common/response');

module.exports.SalesController = {
getSales: async (req, res) => {
try{
    let Sales=await SalesService.getAll();
    Response.success(res, 200, 'Lista de Ventas', Sales)
}
catch(error){
    debug(error);
    Response.error(res);
}
},
getSale: async (req, res) => {
try{
    const { params: {id}} = req;
    let Sale= await SalesService.getByID(id)
    if(!Sale){
    Response.error(res, new createError.NotFound());

    }
    Response.success(res, 200, `Saleo ${id}`, Sale)
}
catch(error){
    debug(error);
    Response.error(res);
}
} ,

createSale: async (req, res) => {
    try {
      const { body } = req
 
      if (body || Object.keys(body).length > 0) {
        let Sale = await SalesService.getById(body.Sale)
        let user = await UsersService.getById(body.user)
 
        if (!Sale || !user || Sale.stock < body.quantity) {
          Response.error(
            res,
            new createErrors.BadRequest('User, Sale not exists or no stock available')
          )
        } else {
          const insertedId = await SalesService.create(body)
          Response.success(res, 201, 'The sale has been created', insertedId)
        }
      } else {
        Response.error(res, new createErrors.BadRequest('Error, no body data exists'))
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
// updateSale: async(req, res) => {
// try{
//     const { params: {id}} = req;
//     let {body} = req;
//     let Sale= await SalesService.getByID(id)
//     if(!Sale){
//     Response.error(res, new createError.NotFound());
//     }
//     else{
//         if(!body || Object.keys(body).length === 0){
//             Response.error(res, new createError.BadRequest())
//          }else {
//            let updateSale= await SalesService.updateByID(id, body);
//            Response.success(res, 200, `Saleo ${id} actualizado`, updateSale)
                    
//          }
//     }
    
// }
// catch(error){
//     debug(error);
//     Response.error(res);
// }
// },
// deleteSale: async (req, res) => {
// try{
//     const { params: {id}} = req;
//     let Sale= await SalesService.getByID(id)
//     if(!Sale){
//     Response.error(res, new createError.NotFound());
//    }
//    let deletedSale= await SalesService.deleteByID(id);
//     Response.success(res, 200, `Saleo ${id} eliminado`, Sale)
// }
// catch(error){
//     debug(error);
//     Response.error(res);
// }
// } ,


}

