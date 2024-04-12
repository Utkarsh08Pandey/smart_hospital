const express = require('express')
const router =express.Router()
const  {create,read,update,deleteAppointment} = require('../controllers/appointmentController.js')
const MW = require('../middleware.js')

router.get('/read',read)
router.post('/create',create)
router.post('/update' ,update)
router.delete('/delete',deleteAppointment)

module.exports = router