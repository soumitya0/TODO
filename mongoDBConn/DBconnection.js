const mongodb = require('mongodb');
const mongodbClient=mongodb.MongoClient;
const dbName="TODO_DB";
const collectionName="TODO_LIST";
const connectDB=mongodbClient.connect(url,{ useUnifiedTopology: true },function(err,client){
    if(err){

      console.log(err);

    }
    console.log("Database created!");
    
    var dbo=client.db(dbName); //db name 

    var dbCollection=dbo.collection(collectionName);  //connected with collection

    //this is document that we are adding to our collection
    dbCollection.insertOne({
      "name":"soumitya",
      "gender":"male",
      "city":"Delhi"
    })

    var query={};

    dbCollection.find(query).toArray(function(err,data){

      console.log("i am findindg....")
      console.log(data);
      client.close();

    })

  });

  

    module.exports= connectDB;
