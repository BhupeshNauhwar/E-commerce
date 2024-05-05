const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://bhupesh05:VkpWdx5IDOi3lovx@ecommerce.1mvzvsa.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce')
 //mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect")
})

const express=require('express');
const app=express();

const userRoute=require('./routes/userRoutes')
app.use('/',userRoute)
const adminRoute=require('./routes/adminroutes')
app.use('/admin',adminRoute)

app.listen(3000,()=>{
    console.log(`http://localhost:3000`)
})

