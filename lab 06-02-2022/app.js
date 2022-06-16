const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const SingularStringSave = require("./js/schemas/SingularStringSaveSchema");
const LeaderBoardSaveModel = require("./js/schemas/LeaderBoardModel");
const app = express();
const wwwroot = "wwwroot"
const databaseURI = "mongodb://localhost:27017/newDatabase"

const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect(databaseURI);

app.use(express.json({
    limit: "1mb"
}));

app.use(express.static(wwwroot));

app.get("/", (request, response)=>{
    response.sendFile("index.html");
});
app.post("/postNewScore", (req, res) => {
    let newScoreEntry = LeaderBoardSaveModel({
        name: req.body.name,
        score : req.body.score
    })
    newScoreEntry.save(newScoreEntry);
    res.send(req.body);
});
app.get("/fetchLeaderBoardData", function(req, res){
    LeaderBoardSaveModel.find(function(error, data){
        console.log(data);
        let postData = [];
        for(let i of data){
            postData.push({
               name: i.name,
               score: i.score 
            });
        }
        res.send(JSON.stringify(postData));
    })

});
app.post("/test", (request, response) => {
    console.log(request.body);
    let newModelData = SingularStringSave({
        Test: request.body.testField
    });
    let newObjectID = newModelData._id.toString();
    newModelData.save(newModelData).then(function(){
        SingularStringSave.findById(newObjectID, (error, data) =>{
            console.log(`found data with id ${newObjectID} data: ${data}`);
            response.send(JSON.stringify(data));
        })
    });
});

var httpServer = http.createServer(app);
httpServer.listen(port);