import {Schema,model} from 'mongoose'

//create user schema
const productSchema=new Schema({

    productName:{
        type:String,
        required:[true,"ProductName is required"],  //true means req proprerty is enabled
    },
    price:{
        type:Number,
        required:[true,"Product price required"]
    },
    brand:{
        type:String,
        required:[true,"Price brand is required"],
    },

},{
    strict:"throw",
    timestamps:true,
    versionKey:false
})


//create user model with that schema
export const ProductModel=model("product",productSchema)