const express=require('express')
const app=express()
const port=process.env.PORT || 5000;
require('dotenv').config()
const cors=require('cors')


// middleware

app.use(cors())
app.use(express.json())


const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1clhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);
async function run(){

    try{
 
    await client.connect();
    const database = client.db("KICempty");
    const ClientsCollection = database.collection("Clients");
    const PortfolioCollection = database.collection("Portfolio");
  


// GET clients
app.get('/Clients',async(req,res)=>{
    const cursor=ClientsCollection.find({})
    const clients=await cursor.toArray()
    res.send(clients)
})
// GET review data 
app.get('/Portfolio',async(req,res)=>{
    const cursor=PortfolioCollection.find({})
    const portfolio=await cursor.toArray()
    res.send(portfolio)
})

 

}



    finally{

    }

}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('running d sdfsdg ')
})

app.listen(port,(req,res)=>{
    console.log('running prot',port);
})