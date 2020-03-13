const express=require('express');
const fs= require('fs');
const path=require('path');

const routes = require("./Routes/routes");

const mongodb = require("mongodb");
//const mongodbClient=mongodb.MongoClient;
const dbName="TODO_DB";
const DB_URL='mongodb+srv://soumitya:soumitya@cluster0-tcuot.mongodb.net/test?retryWrites=true&w=majority';



const app=express();

app.use(express.json());



app.use(express.static(path.join(__dirname,"UI")));   // this is for hole file


app.get('/' ,function(req,res){
    console.log(req.url);
    fs.readFile("./UI/index.html",function(err,data)
    {
        res.send(data.toString());

    })
})

app.use(express.static('./UI/Assets'));



console.log("checking connection with the MongoDB.....");
mongodb.MongoClient.connect(DB_URL,{ useUnifiedTopology: true },(err,client)=>{
    if(err){

      console.log(err);

    }
    console.log("Database created!");
    
    const database=client.db(dbName); //db name 

    routes(app, database);   //send this for the rout 

  });







app.listen(process.env.PORT || 5000 ,function(){
    console.log('server is Running');


})

