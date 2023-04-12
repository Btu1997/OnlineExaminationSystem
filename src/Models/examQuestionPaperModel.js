const mongoose = require("mongoose");

const examQuestionPaperSchema= new mongoose.Schema({
    Id:{type: Number,required:true},
    examId: {
        type:ObjectId,
        ref: "exam",
        required: true
    },
    qId:{ 
        type : ObjectId,
        ref : "questions",
        required : true
    },
    status:{}
},
{timestamps: true})

module.exports = mongoose.model("examQuestionPaper", examQuestionPaperSchema);



userId: {
    type: ObjectId,
    ref: 'user',
    required: true