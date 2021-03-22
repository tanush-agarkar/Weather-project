const express=require("express");
const https=require("https");
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
 res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

  const query=req.body.cityname;
  const id="ff37efade43838ad180c2e6614b4671b";
  const unit="metric";

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+ "&appid=" + id + "&units="+ unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
     const weatherdata = JSON.parse(data);
     const temp = weatherdata.main.temp;
     const weather= weatherdata.weather[0].description;
     const icon = weatherdata.weather[0].icon;
     const iconURL="https://openweathermap.org/img/wn/" + icon + "@2x.png";



     res.send("<h3>the weather is currently " + weather +"</h3>" + "<h1>the temperature of "+ query + " is " + temp + " degree celcius.</h1>" + "<img src=" + iconURL+ ">");

    })

  });


})




app.listen(3000,function(){
  console.log("server is running on port 3000");
});
