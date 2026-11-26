const {MongoClient,ServerApiVersion}=require('mongodb')
const uri=process.env.BETTER_AUTH_MONGODB_URL
const client=new MongoClient(uri,{
  serverApi:{
    version:ServerApiVersion.v1,
    strict:true,
    deprecationErrors:true
  }
})
let db;
const connectDB=async()=>{
  try{
    await client .connect()
    db= client.db('car-wash')
    await client .db('admin').command({ping:1})
    console.log("Mongodb successfull connected!")
    return db;
  }
  catch(error){
    console.error('Failed to connected',error)
    throw error;

  }
}
const getDB=()=>{
  if(!db){
    throw new Error('Failed to find out database')
  }
  return db;
}
module.exports={connectDB,getDB}