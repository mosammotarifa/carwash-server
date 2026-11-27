require('dotenv').config()
const express =require("express")
const cors =require("cors")
const {  connectDB } = require('./config/db')


const { seedServices } = require('./utils/seedServices')
const { serviceRouter } = require('./routes/service.routers')
const app = express ()
const port = process.env.PORT||5000
//middlewase
app.use(cors())
app.use(express.json())
app.use('/service',serviceRouter)


//home
app.get('/',async(req,res)=>{
  res.send({
    success:true,
    message:"Server successfully running"
  })
})
const stratServer=async()=>{
  try{
    const db = await connectDB()
    app.locals.db=db
    await seedServices(db)
    app.listen(port,()=>{
      console.log("server successfull connected")
    })

  }catch(error){
    console.error("Failed to setup Server",error)
  
  }
}
stratServer(

)