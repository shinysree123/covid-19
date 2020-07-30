var Express =require('express');
var {testModel}=require('../model/test');
const testrouter=Express.Router();
router.get('/covid test results',(req,res)=>{
    res.send("welcome to  portal");
});
router.post('/search', async (req, res) => {
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
router.post('/result', async (req, res) => {
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
router.post('/delete', (req, res) => {
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
router.post('/update', (req, res) => {
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
router.get('/viewcoviddetails', async (req, res) => {
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
module.exports=testrouter;



