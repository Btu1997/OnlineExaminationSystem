const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({

    qId:{
        type : String,
        required: true,
        unique: true,
    },
    qType:{
        type: String,
        required: true,
    },
    qDescription:{
        type: String,
        required:true,
    },
    correctOptionId:{
        type : String,
        required: true,
    }

},{timestamps: true})

module.exports = mogoose.model("questions", questionSchema);