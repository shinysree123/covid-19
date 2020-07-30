var Express =require('express');
var {covidModel}=require('../model/detail');
var {testModel}=require('../model/test');
const patientrouter=Express.Router();
router.get('/covid-19',(req,res)=>{
    res.send("welcome to  portal");
});
router.post('/insert',async(req,res)=>{
    try {
        var coviddata= new covidModel(req.body);
        var result= await coviddata.save();
        res.json(result);
    } catch (error) {
        console.log(error);
    res.status(500).send(error);     }            
});
router.post('/viewall',async(req,res)=>{
    try {
        var result =await covidModel.find();
        res.send(result);
    } catch (error) {
        console.log(error);
    res.status(500).send(error);
    }
});
module.exports=patientrouter;
