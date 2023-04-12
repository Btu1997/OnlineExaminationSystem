const mongoose= require("mongoose")

const examSchema = new mongoose.Schema({
    examType: {type:String,required:true},
    examId : {type: Number,required: true},
    subject: {type : String, required: true},
    examDuration: {type: String, required: true},
    totalQuestions: {type : Number, required :true}
   
},
{timestamps: true})

module.exports = mongoose.model("exam", examSchema);