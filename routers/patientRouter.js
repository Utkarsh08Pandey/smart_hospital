const express = require('express')
const router =express.Router()
const  {register,login,read,dashboard,update,deletePatient} = require('../controllers/patientController.js')

router.post('/register',register)
router.get('/read',read)
router.post('/login',login)
router.get('/dashboard/:id',dashboard)
router.put('/update',update)
router.delete('/deletePatient',deletePatient)
module.exports = router