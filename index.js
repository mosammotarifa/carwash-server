const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require ('cors')
app.use(cors());
app.use(express.json());
const uri = process.env.BETTER_AUTH_MONGODB_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const run =async()=>{
  try{
    await client .connect()
    const db= client .db('car-wash')
    const userCollection= db .collection('services')
    app.get('/user-services',async(req,res)=>{
      const result = await userCollection .find().toArray()
      res.send(result)
    })
    await client .db('admin').command({ping:1})
    console.log("successfull deployment done")
  }
  finally{
    // await client .close()
  }
}
run().catch(console.dir)
app.get("/", (req, res) => {
  res.send({ message: "the server is ready for run this is home." });
});

app.listen(port, () => {
  console.log("the server is ready to run");
});
