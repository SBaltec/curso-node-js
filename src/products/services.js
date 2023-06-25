const {ObjectId} = require('mongodb');
const {Database} =require('../database');
const {ProductsUtils} = require('./utils');
const COLLECTION = 'products';

const getAll= async()=> {
const collection= await Database(COLLECTION);
return await collection.find({}).toArray();
}
const getByID= async(id)=> {
const collection= await Database(COLLECTION)
const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId })
}


    
const create =async(product)=>{
    const collection = await Database(COLLECTION);
    let result=await collection.insertOne(product);
    return result.insertedId;
}

const generatedReport = async (name, res)=>{
 let products = await getAll();
  ProductsUtils.excelGenerator(products,name, res );

}

const deleteByID= async(id)=> {
    const collection= await Database(COLLECTION)
    const objectId = new ObjectId(id)
        return await collection.deleteOne({ _id: objectId })
    }

    
const updateByID= async( id, body)=> {
    const collection= await Database(COLLECTION)
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        let updateDocument = {
         $set:body
        };
        const options = { upsert: true };
        let result =await collection.updateOne(filter, updateDocument, options);
        return await getByID(id);

        }

module.exports.ProductsService = {
 getAll,
 getByID,
 create,
 generatedReport,
 deleteByID,
 updateByID
}