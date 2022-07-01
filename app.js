const express = require("express");
const https = require("https");
const http = require("http");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
  
});
app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "0b111674b9e30d9f3d5f52ee79b6241b";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    res.setHeader("Content-Type", "text/html");
    const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  
    res.write("<h3>The weather is currently " + weatherDescription +"</h3>");
    res.write("<h1>The temperature in " + query + " is " + temp + " &#8451;.</h1>");
    res.write("<img src=" + imageUrl +">")
    res.send();
    });
});
    
})





app.listen(3000, function(){
    console.log("Server running on port 3000");
});