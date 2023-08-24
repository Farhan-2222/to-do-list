
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req,res){
  let currentDay=date();
  res.render("list", {listType: currentDay, newListItems: items});

})

app.post("/", function(req,res){
  let item = req.body.itemName;
  if(req.body.addB === "Work list")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req,res){
  res.render("list", {listType: "Work list", newListItems: workItems});
})

app.get("/about", function(req,res){
  res.render("about");
})


app.listen(3000, function(){
  console.log("App is running in port 3000.");
})
