const mongoose= require("mongoose")

const resultSchema = new mongoose.Schema({
    resultId:{},
    studentId:{},
    examId:{},
    qId:{},
    answerId:{},
    answer: {}
},
{timestamps: true});

module.exports= mongoose.model("result", resultSchema);