import exp from 'express';
import {connect} from 'mongoose'
import { userRoute } from './API/userAPI.js';
import { prodRoute } from './API/productAPI.js';


const app=exp();

async function connectDB(){
    try {
    await connect('mongodb://localhost:27017/ecomdb')
    console.log("DB Connection success")
    //assign port
    const port=4000;
    app.listen(port,()=>console.log("server listening to port 4000...."))
    }catch(err) {
        console.log("err in db connection :",err)
    }
}

connectDB()

app.use(exp.json());

app.use('/user-api',userRoute)
app.use('/product-api',prodRoute)


app.use((err,req,res,next)=>{
    res.json({message:"Error",reason:err.message});
})
