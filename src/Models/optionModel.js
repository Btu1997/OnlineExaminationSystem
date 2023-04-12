const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    qOptionId:{},
    qId:{},
    optionDescription:{},

},
{timestamps: true});

module.exports = mongoose.model("options", optionSchema);