const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const route = require('./routes/router')

const app = express()

app.use(cors())
app.use("*",cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://Uranium-Batch:aruSjkdGdfhc9MRK@functionup.eel5r.mongodb.net/InfinoAssignment?retryWrites=true&w=majority', {
  useNewUrlParser: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to mongoDB:", err.message))

app.use('/',route)

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening at port", process.env.PORT || 3001)
})