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



















// app.get('/api/todo', function(req , res){

//     //res.send("i am working "); 
//     fs.readFile("./UI/todo.json",function(err,data){ //these data is in Buffer to we have to convert in string
//         res.send(data.toString());
//     }) 
// })



// // creating an api to store the data in json form input tag
// app.get('/api/todos/adddata',function(req,res)
//     {
//         console.log(req.query);
//         //http://localhost:5001/api/todos/add/?todoname=soumitya

//         // to add the data with query we will use as a query key  that will provid in url with out this it will be not add 
        
//         if(req.query.todoname!="")  //here todoname is queryParms key
//         {

//             var a=req.query.todoname;
//             console.log(a); //{ todoname: 'soumitya' }

//             fs.readFile('./UI/todo.json',function(err,data)
//             {
//                 var todolistData=JSON.parse(data);
//                 console.log(todolistData);  
                
//                 todolistData.todo.push({"title":a,"checked":false});

//                 console.log(todolistData);  
                
//                 //res.send(todolistData);

//                 fs.writeFile("./UI/todo.json",JSON.stringify(todolistData),function(err,data){
//                     res.send("Saved new todo data "+a);
//                   });


//             })

//         }else{
//             console.log("Not a Valid Data");
//         }
//     })







