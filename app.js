const express = require ("express");
const bodyParser = require("body-parser");

const app = express();

let tasks = [];
let grocery = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    
    let date = new Date();

   let options = {
        weekday: 'long',
        day :'numeric',
        month: 'long'
    };

    let day = date.toLocaleDateString("en-IN", options);
    
         res.render('list', {listTitle : day, newTasks: tasks});
});

app.post("/", function(req, res){
    let task = req.body.addTask;

    if(req.body.list === "Grocery"){
        grocery.push(task);
        res.redirect("/grocery");
    } else {
        tasks.push(task);
        res.redirect("/");
    };

    
});

app.get("/grocery", function(req, res){
    res.render('list', {listTitle: "Grocery List", newTasks: grocery});
});

app.get("/about", function(req, res){
    res.render('about');
});


app.listen(3000, function(){
    console.log("Server up and running on 3000");
});