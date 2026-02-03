import exp from 'express'
import { ProductModel } from '../Models/ProductModel.js'
export const prodRoute =exp.Router()

prodRoute.post('/products',async(req,res)=>{
    let productObj=req.body;
    let productDocument=new ProductModel(productObj)
    await productDocument.save()
    res.status(201).json({message:"product added",payload:productDocument})
})