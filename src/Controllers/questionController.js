const adminModel = require("../Models/adminModel");
const questionModel= require("../Models/questionModel")


const  createQuestion = async function (req, res) {
   
    try {
        const data = req.body
        const adminId=  req.params.adminId
        const decodedToken = req.decodedToken;
        const {qId,qType,qDescription,correctOptionId}= data
        if(!adminId) return res.status(400).send({status:false,msg: "Admin Id required in path param"})
        let adminDetails= await adminModel.findOne({_id:adminId})
        if(!adminDetails) return res.status(404).send({status:false,msg:"Admin data not found"})
        if(adminDetails._id != decodedToken.adminId) return res.status(401).send({status:false, msg: "You are unauthorized!"})
    
        if(!qId) return res.status(400).send({status:false,msg: "qId required"})
        if(!qType) return res.status(400).send({status:false,msg: "qType required"})
        if(!qDescription) return res.status(400).send({status:false,msg: "qDescription required"})
        if(!correctOptionId) return res.status(400).send({status:false,msg: "correctOptionId required"})
       
        let question= await questionModel.create(data)
        return res.status(201).send({status:true, msg:"created successfully", data: question})
    }
     catch (error) {  
      return res.status(500).send({ error: error.message })
        
    }
      

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const  getQuestionDetails = async function(req, res) {
    try {
      const questionId = req.params.qId;
  
     if(!qId) return res.status(400).send({ status: false, message: "qId is required in params " })
  
      let questionDetails = await questionModel.find({qId:qId})
      
          if (questionDetails.length == 0) {
            return res.status(404).json({ message: 'No question found ' });
          }
        
        return res.status(200).send({ status: true, message: "Success", data: questionDetails })
  
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
  }
  
  //////////////////////////Update question/////////////////////////////////

  const updateQuestion= async function(req,res){


    try {
      const adminId= req.params.adminId
      const data = req.body
      const { qId,qType,qDescription,correctOptionId} = data;

      const decodedToken = req.decodedToken
    
      if (!adminId) return res.status(400).send({ status: false, message: "Employee Id is mandatory and should have non empty String" })
    
    let   adminDetails= await adminModel.findOne({adminId:adminId})
    
    if(!adminDetails) return res.status(404).send({ status: false, messgage: ' Admin  data not found' })
    if (adminDetails._id != decodedToken.adminId) return res.status(401).send({ status: false, messgage: 'You are Unauthorized !' })
   
   // if (!qId) return res.status(400).send({ status: false, message: "qId is mandatory " })
          
   
      let updatedQuestion= await questionModel.findOneAndUpdate({qId:qId},{$set:data},{new:true})
      return res.status(201).send({ status: true, message: "Updated successfully", data: updatedQuestion })
    
    } catch (error) {
    return res.status(500).send({ error: error.message })
    }
    }

    /////////////////////////////////////////////////Delete Questions//////////////////////////////////////////////////////////////
    const  deleteQuestionById = async function(req, res) {
        try {
            const qId = req.params.qId;
            const adminId= req.params.adminId;
      
            const decodedToken = req.decodedToken
            if(!qId)return res.status(400).send({status:false, message:"Question id required"})
             
              if(!adminId)return res.status(400).send({status:false, message:"Employee id is required"})
                // if (!isValidObjectId(hospital_id)) return res.status(400).send({ status: false, message: "BloodSample Id is not valid" })
                if (adminId!== decodedToken.adminId) return res.status(401).send({ status: false, messgage: 'You are Unauthorized !' })
            let data = await questionModel.findOne({ qId: qId, isDeleted: false })
            if (!data) return res.status(404).send({ status: true, message: "Question Not found by this qId or may be deleted already" });
      
            await questionModel.findByIdAndUpdate(qId, { isDeleted: true, })
            return res.status(200).send({ status: true, message: "Deleted Successfully" });
      
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
      }
    
module.exports={createQuestion, getQuestionDetails,updateQuestion,deleteQuestionById}