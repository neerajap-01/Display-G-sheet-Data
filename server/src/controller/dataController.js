const dataModel = require('../model/dataModel');
const { validObjectId } = require('../utils/validation')


const addData = async (req, res) => {
  try {
    //gets the data from the body which has google sheet and array of objects containing random numbers
    let payload = req.body
    
    //checking for sheet link if already exist
    let checkLink = await dataModel.findOneAndUpdate({ sheetLink: payload.sheetLink })
    if(checkLink){
      //update the existing sheet link data
      let updatedData = await dataModel.findOneAndUpdate(
        { sheetLink: payload.sheetLink },
        { data: payload.data },
        { new: true }
      )

      return res.status(200).send({ status: true, message: "Data has been updated", data: updatedData })
    }
    //creating the document with provided values
    let resData = await dataModel.create(payload);
    return res.status(201).send({ status: true, message: "Data added to the database", data: resData })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}

const multiplyData = async (req, res) => {
  try {
    //fetching the Document id
    let docId = req.params.id;
    //validation the Id 
    if(!validObjectId(docId)) return res.status(400).send({ status: false, message: "Enter a valid document id" })    

    //Fetching the number and parsing it to a number from string
    let num = parseInt(req.body.number)

    //checking if the document exist in database or not
    const findDoc = await dataModel.findById(docId);
    if(!findDoc) return res.status(404).send({ status: false, message: "Document not found" })

    //multiplying the number by the values from the database
    findDoc.data.map(x => {
      x['Random Numbers'] = parseInt(x['Random Numbers']) * num;
    })

    return res.status(200).send({ status: true, message: "Calculation done", data: findDoc })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}

module.exports = {addData,multiplyData}