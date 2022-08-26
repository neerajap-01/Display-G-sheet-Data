const express = require('express');
const { addData, multiplyData } = require('../controller/dataController')

const router = express.Router()

router.post('/addData', addData)
router.post('/multiply/:id', multiplyData)

module.exports = router