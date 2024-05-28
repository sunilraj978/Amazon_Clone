const mongoose = require('mongoose')

const express = require('express')

const cors = require('cors')
const shortId = require('shortid')


const app  = express()

app.use(express.json())
app.use(cors())



//Mongoose
mongoose.connect("mongodb+srv://AmazonClone:123sunilraj@cluster0.dpomy.mongodb.net/AmazonClone?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false}).then(()=>{
    console.log("Connected")
})

//create a model
const Product = mongoose.model("product",mongoose.Schema({
    _id:{type:String,default:shortId.generate,},
    title:String,
    image:String,
    description:String,
    price:String,
    availableSizes:[String]
}))

app.get('/api/products', async(req,res)=>{
    const products = await Product.find({})
    res.send(products)
})

app.post('/api/products',async(req,res)=>{
    const newProduct = new Product(req.body);

    const saveProduct = await newProduct.save()
    res.send(saveProduct)
})


app.delete("/api/products/:id",async(req,res)=>{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProduct)
})



//model for placeOrder:
const Order = mongoose.model("order",new mongoose.Schema({
    _id:{type:String,default:shortId.generate},
    email:String,
    name:String,
    address:String,
    total:Number,
    cartItems:[{
        _id:String,
        title:String,
        price:Number,
        count:Number
    }]
},{timestamps:true}))


app.post("/api/order",async(req,res)=>{
    if(!req.body.name||
        !req.body.address||
        !req.body.email||
        !req.body.cartItems||
        !req.body.total
        ) {
        return res.send({message:"Please Fill All Fields"})
    }

    const doggle = new Order(req.body)
    const order = await doggle.save()
    res.send(order)
})



app.listen(5000,()=>{
    console.log("Connected to 5000")
})