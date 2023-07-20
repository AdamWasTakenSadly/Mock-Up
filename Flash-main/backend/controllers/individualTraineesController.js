const IndividualTrainee = require('../models/individualTraineesModel')

const Course = require('../models/coursesModel')





//GET all indvidual trainees
const getIndividualTrainees = (req, res) => {
    res.json({ mssg: "get all individual trainees" })
}

const getIndividualTraineeName = async (req,res)=>{
    const id = req.params.id
    res.status(200).json( await IndividualTrainee.findById({"_id":id}).select({ _id:0,username:1}))
}

//GET a single individual trainee
const getIndividualTrainee = async (req, res) => {
    try {
        const id = req.params.id
        const user = await IndividualTrainee.findOne({ _id: id });
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//POST a new individual trainee
const addIndividualTrainee = async (req, res) => {

    const { username, password, email, firstName, lastName, creditCardNo, currentCourses, pastCourses, gender,
        wallet } = req.body

    try {
        const individualTrainee = await IndividualTrainee.create({
            username, password, email, firstName, lastName, creditCardNo, currentCourses, pastCourses, gender,
            wallet
        })

        res.status(200).json(individualTrainee)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
    //res.json({mssg: "create a new individual trainee"})
}

//DELETE an individual trainee
const deleteIndividualTrainee = (req, res) => {
    res.json({ mssg: "delete an individual trainee" })
}



module.exports = {
    getIndividualTrainees, getIndividualTrainee, addIndividualTrainee, deleteIndividualTrainee,
 getIndividualTraineeName
}

