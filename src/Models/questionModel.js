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
    },
    isDeleted:{
        type: Boolean,
        default:false
    }

},{timestamps: true})

module.exports = mongoose.model("questions", questionSchema);