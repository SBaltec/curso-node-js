    const createError=require('http-errors');
    const debug=require('debug')('app:module-users-controller');
    const {usersService} = require('./services');
    const {Response} = require('../common/response');
module.exports.usersController = {
getusers: async (req, res) => {
    try{
        let users=await usersService.getAll();
        Response.success(res, 200, 'Lista de usuarios', users)
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
},
getuser: async (req, res) => {
    try{
        const { params: {id}} = req;
        let user= await usersService.getByID(id)
        if(!user){
        Response.error(res, new createError.NotFound());

        }
        Response.success(res, 200, `usuario ${id}`, user)
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
} ,

createuser: async(req, res) => {
    try{
        const {body}=req;
        if(!body || Object.keys(body).length === 0){
            Response.error(res, new createError.BadRequest())
        }else {
        const inserteduser= await usersService.create(body);
        Response.success(res, 201, 'usuario agregado', inserteduser)
        }
    }
    catch(error){
        debug(error);
        Response.error(res);
    }   
},

updateuser: async(req, res) => {
    try{
        const { params: {id}} = req;
        let {body} = req;
        let user= await usersService.getByID(id)
        if(!user){
        Response.error(res, new createError.NotFound());
        }
        else{
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
             }else {
               let updateuser= await usersService.updateByID(id, body);
               Response.success(res, 200, `usuario ${id} actualizado`, updateuser)
                        
             }
        }
        
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
},
deleteuser: async (req, res) => {
    try{
        const { params: {id}} = req;
        let user= await usersService.getByID(id)
        if(!user){
        Response.error(res, new createError.NotFound());
       }
       let deletedUser= await usersService.deleteByID(id);
        Response.success(res, 200, `usuario ${id} eliminado`, user)
    }
    catch(error){
        debug(error);
        Response.error(res);
    }
} ,


}