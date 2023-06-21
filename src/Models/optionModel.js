const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    OptionId:{
        type:String,
        required:true
    },
    qId:{
        type:String,
        
    },
    optionDescription:{},

},
{timestamps: true});

module.exports = mongoose.model("options", optionSchema);