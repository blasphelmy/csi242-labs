const mongoose = require("mongoose");

const LeaderBoardSchematics = new mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    score : {
        type: String,
        require: true
    }
});

const LeaderBoardScoreModel = mongoose.model("LeaderBoardScoreModel", LeaderBoardSchematics);

module.exports = LeaderBoardScoreModel;