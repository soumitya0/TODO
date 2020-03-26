console.log("i am woring");


myFunction();

var Username;
function myFunction() {


     Username = prompt("Please enter your name:", "Soumitya");
    if (Username == null || Username == "") {
      console.log("User cancelled the prompt.");
    } else {
      console.log("userName "+Username);
      
      document.getElementById('avatarName').innerHTML=Username;

      fetch('/api/todos').then( function(response){

        console.log("/api/todo is running ... to get the data")
        console.log(response);

        response.text().then(function(data){
            var todo_data=JSON.parse(data);
            console.log(todo_data);

            console.log(todo_data.result);
            var listOfTodo=todo_data.result;

            console.log("for");

           for(var i=0; i<listOfTodo.length ;i++)
           {


            if(Username == listOfTodo[i].name)
            {
                     console.log(listOfTodo[i]._id);

                    //console.log(listOfTodo[i].todo);

                    var li = document.createElement("li");
                    //li.innerHTML=listOfTodo[i].todo;\
                    
                    li.setAttribute("id", listOfTodo[i]._id);
                    console.log(li);
                    var status=listOfTodo[i].checked;
                    console.log("status"+status);
                  

                    //checkBox
                    var checkBoxElement=document.createElement("input");  //these means -> <input type="">
                    checkBoxElement.classList="checkBoxElement"
                    checkBoxElement.type="checkbox";
                    checkBoxElement.checked=listOfTodo[i].checked; 
                    checkBoxElement.onclick=onChecked;  //Event Handler //don't use the onChecked() like because it will call that function but if you useing only onChecked then it will not call    
                    li.appendChild(checkBoxElement);     //<li><input></li>
          
                  
                    //text Span
                    var todoText=document.createElement("span");
                    todoText.innerText=listOfTodo[i].todo;
                    li.appendChild(todoText); 
                    console.log("name :"+listOfTodo[i].todo);


                    document.getElementById('myUL').appendChild(li);


                   

                    //Delete Icon
                    var span = document.createElement("SPAN");
                   
                    var txt = document.createTextNode("\u00D7");
                    span.className = "delete";
                    span.onclick=deleteClick;
                    span.appendChild(txt);  //<span>txt</span>
                    li.appendChild(span);   

                      
                    

                    //Edit Icon
                    var spanImag = document.createElement("SPAN");
                    spanImag.className = "spanImag";


                    

                    //spanImag.setAttribute("index",i);
                    
                    spanImag.setAttribute("todoData", listOfTodo[i].todo);

                    spanImag.onclick=editClick;

                    var x = document.createElement("IMG");
                    x.setAttribute("src", "./Assets/penHover.png");
                    
                    x.className = "EditImg";
                    x.setAttribute("alt", "The Pulpit Rock");
                    
                    spanImag.appendChild(x);  //<span>txt</span>
                    li.appendChild(spanImag);   


                    


            }
            

           }


          })


    
        });


    }
}  







//checkBox CLick add to db  
   function onChecked(){
               

        if(this.checked )
        {   
             this.parentElement.classList.add("checked"); //call  the css

             console.log(this.parentElement);


             checkStatus();
             
              // we need to create a put method because we are updating the status;
              
            console.log("i am checked Clicked");
         }else{

             console.log("i am NOt Clicked");
             this.parentElement.classList.remove("checked"); 
             checkStatus();

         }

            
    }

    function checkStatus(){
      

      const todo = event.target.parentNode;
      const todo_id=todo.id;
      console.log("id is "+ todo_id);
    

      const status =event.target.checked.toString();  // this will return that if the checkbox is checked then it will return true else false
      console.log(status);
      console.log("typeOf "+typeof(status));


      const data =JSON.stringify({ checked: status }) ; //  

        fetch('/api/todos/'+todo_id,{     
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json"
          }
      
          
        })  
  

    }

    //BTN click 

    function newElement(){

        //now adding element 

        console.log("Add Button click")
        var value=document.getElementById("myInput").value;
        console.log(value);

        if(value =="")
        {
          alert("ADD TODO");
        }else{

        

        //taking the and convert JSON.stringify()
        const data = JSON.stringify({
            name:Username,
            todo: value
          });


          console.log(data);

          //fetch()

          //calling the api anz
          fetch('/api/todos/add_data',{     
              method: "POST",
              body: data,                       // adding the data
              headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(){

            var todoDiv=document.getElementById("myUL");    
            var li = document.createElement("li");
            li.innerHTML=value;
            console.log(li);
            

            document.getElementById('myUL').appendChild(li);
           
            var checkBoxElement=document.createElement("input");  //these means -> <input type="">
            checkBoxElement.classList="checkBoxElement" //classID
             //set this input element type to checkBox
             checkBoxElement.type="checkbox";
            

             checkBoxElement.onclick=onChecked;  //Event Handler //don't use the onChecked() like because it will call that function but if you useing only onChecked then it will not call    
             li.appendChild(checkBoxElement);     //<li><input></li>
    

             //Delete Icon
             var span = document.createElement("SPAN");
             var txt = document.createTextNode("\u00D7");
             span.className = "delete";
             span.onclick=deleteClick;
             span.appendChild(txt);
             li.appendChild(span);   
            
            
             //Edit Icon
                                  
             


          })
          .catch(err => {
            res.send('erroe');
        })



  }
}



    
function deleteClick () {
    console.log("delete is click");


   // const todo = event.target.parentNode.parentNode;  this will get you the UL
   // const todo = event.target.parentNode;  this will get you the LI

   const todo = event.target.parentNode; 
   const todo_id=todo.id;
   console.log(todo_id);
   
    // add the to todo_is in url
   // const delUri = hostURL + todo.id;


    fetch('/api/todos/add_data/'+todo_id,{     
        method: "DELETE",
        headers: {
              "Content-Type": "application/json"
          }
      })

        var div = this.parentElement;
         div.style.display = "none";

    
  
}
  var count=0;

  var id_TODO;

  function editClick(event){
    document.getElementById("myForm").style.display = "block";
  
  
    var x = event.target;
    console.log(x);			
    
    // const tododata = x.id;
    // console.log(tododata);

    const oldTodoData=event.currentTarget.getAttribute('tododata');
    console.log(oldTodoData);

    document.getElementById("oldtodo").value=oldTodoData;





    

    const todo = event.target.parentNode;
      const todo_id=todo.id;
      id_TODO=todo_id;  // i am send the id value to global variable that will assecc by todoUpdate fro APIv
      //console.log("id is "+ todo_id);
    
    
  }

  function todoUpdate(){
     
      console.log("upDate button click")
      var OLD_TODO=document.getElementById("oldtodo").value;
      console.log("oldTODO: "+OLD_TODO);
      //newtodo
      var NEW_TODO=document.getElementById("newtodo").value;
      console.log("newTodo: "+NEW_TODO);
     
     
      //li -id
      console.log(id_TODO);

      const data =JSON.stringify({ todo:NEW_TODO}) ; //  

      //api

      fetch('/api/todos/update/'+id_TODO,{     
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })

      window.location.reload();

      document.getElementById("myForm").style.display = "none";

      console.log("i am called");
      
    }
    
  
  
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}









// function editClick() {

//   var len=document.getElementById("myUL").getElementsByTagName("li").length;


//   document.getElementById("myForm").style.display = "block";
  
//     const div1 = document.getElementById('spanImagId');
//     const align = div1.getAttribute('tododata');

//     console.log(align);

//   //  var oldTodoData = document.getElementsByClassName("spanImag")[0].getAttribute("tododata");
//   // console.log(oldTodoData);
   
//       //now adding value to oldTODO INput 
//   document.getElementById("oldtodo").value=align;





//   //now performing the 

// }