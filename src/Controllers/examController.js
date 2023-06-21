const mongoose = require('mongoose')
const examModel = require('../Models/examModels.js')

  const createExam = async function (req, res) {
    try {
        let data = req.body
        let fields = ["examType","subject","examDesc", "totalMarks", "passMarks","examDuration","totalQuestions"]
        for (const field of fields) {
            if(!data[field]){
                return res.status(400).send({status: false, msg : `please provide required field -->${field}`})
            }
        }
        let savedata = await examModel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, err: err.message })
    }
}

  const getExam = async function(req, res){
    try {
        let examId = req.params.examId
        let adminId = req.params.adminId
        if(!mongoose.isValidObjectId(examId)){
            return res.status(400).send({status: false, msg : "invalid examId, enter valid examId"})
        }
        if(!mongoose.isValidObjectId(adminId)){
            return res.status(400).send({status: false, msg : "invalid adminId, enter valid adminId"})
        }
        let data = await examModel.findOne({_id: examId, isDeleted: false})
        return res.status(201).send({ status: true, data: data })
    } catch (err) {
        return res.status(500).send({ status: false, err: err.message })
    }
}

  const updateExam = async function(req, res){
    try {
        let examId = req.params.examId
        let adminId = req.params.adminId
        if(!mongoose.isValidObjectId(examId)){
            return res.status(400).send({status: false, msg : "invalid examId, enter valid examId"})
        }
        if(!mongoose.isValidObjectId(adminId)){
            return res.status(400).send({status: false, msg : "invalid adminId, enter valid adminId"})
        }
        let data = req.body
        let updetedData = await examModel.findOneAndUpdate({_id: examId, isDeleted: false},{$set: data},{new: true})
        return res.status(200).send({ status: true, data: updetedData })
    } catch (err) {
        return res.status(500).send({ status: false, err: err.message })
    }
}

  const deletExam = async function(req, res){
    try {
        let examId = req.params.examId
        let adminId = req.params.adminId
        if(!mongoose.isValidObjectId(examId)){
            return res.status(400).send({status: false, msg : "invalid examId, enter valid examId"})
        }
        if(!mongoose.isValidObjectId(adminId)){
            return res.status(400).send({status: false, msg : "invalid adminId, enter valid adminId"})
        }
        let deletedExam = await examModel.findOneAndUpdate({_id: examId,isDeleted:false},{$set:{isDeleted: true}}, {new: true})
        if(!deletedExam){
            return res.status(404).send({status: false, message: "exam not found" })
        }
        return res.status(200).send({status: true, message: "exam deleted successfully" })
    } catch (err) {
        return res.status(500).send({ status: false, err: err.message })
    }
}
 


module.exports = {createExam,getExam,updateExam,deletExam}