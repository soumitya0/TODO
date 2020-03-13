const ObjectID = require("mongodb").ObjectID; 
const collectionName="TODO_LIST";
module.exports = function(app, db) {




    // fetch mongodb data 
    app.get('/api/todos' ,function(req,res){
    
        //this is asyn so we have to return promises  when we are calling multiple method then it will be asyn and we have to handle by promises  OR by call Back

        db.collection(collectionName).find({}).toArray()
        .then(result =>{    
            res.send({
                status: "success",
                message:"record Inserted",
                result:result
            })

        }).catch(err => {
            res.status(400).send({
                status: "error",
                message: err
            })
        })


    })




    // add to mongoDb
    app.post('/api/todos/add_data',function(req, res){
        
            var name = req.body.name;
            var todo =req.body.todo;

           
        console.log(name);
        console.log(todo);

        const collection = db.collection(collectionName);
        collection.insert({
            name,
            todo, 
            "checked":false

        })
        .then(result => {
            
            res.send({    //             record: result.ops[0]

                status:"success",
                message: "record created",
              });
    
        }).catch(err => {
            res.send('erroe');
        })

        
    })  


    //delete api        // http://localhost:5000/api/todos/add_data/5e6a01f5b41b6b59a836093a

    app.delete('/api/todos/add_data/:todoId?',function(req, res){

        const collection = db.collection(collectionName);
        const todoId = req.params.todoId;
        console.log("todoId "+todoId);
        const delObj = { _id: new ObjectID(todoId) };


        collection.deleteOne(delObj).then(
            res.send({
              message: "success",
              deletedCount: "1"
            })
          )
          .catch(err => {
            res.status(400).send({
              status: "error",
              message: err
            });
          });
           
    })

    
    //update    
    app.put('/api/todos/:todoId',function(req,res)
    {
           
        const collection = db.collection(collectionName);
        const todoId = req.params.todoId;

        console.log("todoId "+todoId);

        res.send(todoId);

        collection
        .updateOne(
          { _id: new ObjectID(todoId) },
          { $set: { checked: (req.body.checked == 'true'? true:false ) }  }   
        ).then(
            res.send({
              message: "success",
              updatedCount: "1"
            })
          )
          .catch(err =>{
            res.status(400).send({
                status: "error",
                message: err
              });
    
          })



    })




    
    
}

