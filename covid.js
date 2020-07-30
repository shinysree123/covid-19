var Express= require('express');
var Parser=require('body-parser');
var Mongoose=require('mongoose');
var app=Express();
var Coviddetailsrouter=require('./router/detailrouter');
app.use('/',Coviddetailsrouter);
var Testrouter=require('./router/testrouter');
app.use('/',Testrouter);
Mongoose.connect("mongodb+srv://shinyjoseph:shiny@cluster0-wburb.mongodb.net/test?retryWrites=true&w=majority");
app.use(Parser.urlencoded({extended:false}));
app.listen(process.env.PORT||4000,()=>{
    console.log("server started");
});