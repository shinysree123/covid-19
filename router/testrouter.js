var Express =require('express');
var {testModel}=require('../model/test');
var {covidModel}=require('../model/detail');
const testRouter=Express.Router();
testRouter.get('/covid test results',(req,res)=>{
    res.send("welcome to  portal");
});
testRouter.post('/add',async(req,res)=>{
    try {
        var testData= new testModel(req.body);
        var result= await testData.save();
        res.json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
});
testRouter.post('/search', async (req, res) => {
    try {
        var searchkey = req.body.mydata;
        testModel.find({ "user_id": searchkey}, (error, data) => {
            if (error) {
                throw error;
            } else {
                res.send(data);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
testRouter.post('/result', async (req, res) => {
    try {
        var searchuser_id = req.body.user_id;
        var searchresult = req.body.test_result;
        testModel.find({
            $and: [{
                    "user_id": searchuser_id
                },
                {
                    "test_result": searchresult 
                }]
        }, (error, data) => {
            if (error) {
                throw error;
            } else {
                res.send(data);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
testRouter.post('/delete', (req, res) => {
    try {
        testModel.findByIdAndDelete(req.body.user_id, (error, data) => {
            if (error) {
                res.json({
                    "status": "error"
                });
            } else {
                if (data.length > 0) {
                    res.json({
                        "status": "deleted successfully"
                    });
                }
            }
        })
    } catch (error) {}
});
testRouter.post('/update', (req, res) => {
    try {
        testModel.findOneAndUpdate({
                date: req.body.date
            }, req.body,
            (error, data) => {  if (error) {
                    res.json({
                        "status": "error"
                    });

                } else {
                    res.json({
                        "status": "success"
                    });
                }
            })
    } catch (error) {}
});
testRouter.get('/viewcoviddetails', async (req, res) => {
    testModel.aggregate(
        [{
            $lookup: {
                from: "covidmodel",
                localField: "user_id",
                foreignField: "name_id",
                as: "patientdetails"
            }
        }], (error, data) => {
            return res.json(data);
        }
    )
});
module.exports=testRouter;



