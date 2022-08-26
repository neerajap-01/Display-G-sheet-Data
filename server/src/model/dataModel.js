const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  sheetLink: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  data: {
    type: Array,
    required: true,
  }
},{timestamps: true})

module.exports = mongoose.model('Data',dataSchema);