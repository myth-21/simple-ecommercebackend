import exp from 'express'
import { UserModel } from '../Models/userModel.js'
import { hash,compare } from 'bcrypt'
import { ProductModel } from '../Models/ProductModel.js'
export const userRoute =exp.Router()


//create user
userRoute.post('/users',async(req,res)=>{
    //get new user from req
    let newUser=req.body;
    //run validator 
    await new UserModel(newUser).validate()
    //hash the password
    let hashedPassword=await hash(newUser.password,10)
    //replace plain password with hashed password
    newUser.password=hashedPassword;
    //create new user document
    let newUserDoc=new UserModel(newUser)
    //save in db
    await newUserDoc.save({validateBeforeSave:false})
    //mangoose validators will execute at the time of insert and save
    //send res
    res.status(201).json({message:"user created",payload:newUserDoc})
})


//add product to users cart
userRoute.put('/user-cart/user-id/:uid/product-id/:pid',async(req,res)=>{
    //read uid and pid from url parameters=>here two parameters i.e :uid,:pid
    let {uid,pid}=req.params;  //{uid:**  ,pid:** }
    //console.log("uid",uid)
    //console.log("pid",pid)
    //check user
    let user=await UserModel.findById(uid)
    if(!user){
        return res.status(401).json({message:"User not found"})
    }
    //check product
    let product=await ProductModel.findById(pid)
    if(!product)
    {
         return res.status(401).json({message:"Product not found"})
    }
    //perform the update
    let modifiedUser=await UserModel.findByIdAndUpdate(
        uid,
        {$push:{cart:{product:pid}}},   //cart1=product:{}}   ====>  cart1.product        //cart2=[{product:**},{product:**}]   ======>  cart2:{product}
        {new:true}
    );
    //res
    return res.status(200).json({message:"Product added to cart",payload:modifiedUser})

})


//read user by ID
userRoute.get('/users/:uid',async(req,res)=>{
    let {uid}=req.params;
    let userObj=await UserModel.findById(uid).populate("cart.product","productName price")
    res.status(200).json({message:"user",payload:userObj})
})

//populate("reading" , " field name seperaated by space")g