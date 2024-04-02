const express = require('express')
const router =express.Router()
const  {register,login,dashboard} = require('../controllers/patientController.js')

router.post('/register',register)
router.post('/login',login)
router.get('/dashboard',dashboard)

module.exports = router