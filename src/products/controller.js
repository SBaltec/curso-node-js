    const createError=require('http-errors');
    const debug=require('debug')('app:module-products-controller');
    const {ProductsService} = require('./services');
    const {Response} = require('../common/response');
module.exports.ProductsController = {
getProducts: async (req, res) => {
    try{
        let products=await ProductsService.getAll();
        Response.success(res, 200, 'Lista de productos', products)
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
},
getProduct: async (req, res) => {
    try{
        const { params: {id}} = req;
        let product= await ProductsService.getByID(id)
        if(!product){
        Response.error(res, new createError.NotFound());

        }
        Response.success(res, 200, `Producto ${id}`, product)
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
} ,

createProduct: async(req, res) => {
    try{
        const {body}=req;
        if(!body || Object.keys(body).length === 0){
            Response.error(res, new createError.BadRequest())
        }else {
        const insertedProduct= await ProductsService.create(body);
        const copyProduct = {
            _id:insertedProduct,
            ...body
            
            
}
        Response.success(res, 201, 'producto agregado', copyProduct)
        }
    }
    catch(error){
        debug(error);
        Response.error(res);
    }   
},
generatedReport:(req, res)=> {
    try{
        ProductsService.generatedReport('Inventario', res);
    }
    catch(error){
        debug(error);
        Response.error(res);   }
},
updateProduct: async(req, res) => {
    try{
        const { params: {id}} = req;
        let {body} = req;
        let product= await ProductsService.getByID(id)
        if(!product){
        Response.error(res, new createError.NotFound());
        }
        else{
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
             }else {
               let updateProduct= await ProductsService.updateByID(id, body);
               Response.success(res, 200, `Producto ${id} actualizado`, updateProduct)
                        
             }
        }
        
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
},
deleteProduct: async (req, res) => {
    try{
        const { params: {id}} = req;
        let product= await ProductsService.getByID(id)
        if(!product){
        Response.error(res, new createError.NotFound());
       }
       let deletedProduct= await ProductsService.deleteByID(id);
        Response.success(res, 200, `Producto ${id} eliminado`, product)
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
} ,


}