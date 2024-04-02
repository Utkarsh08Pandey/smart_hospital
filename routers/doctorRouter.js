const express = require('express')
const router =express.Router()
const  {create,read,update,deleteDoctor} = require('../controllers/doctorController.js')
const MW = require('../middleware.js')


router.get('/read',read)
router.post('/create',create)
router.put('/update',update)
router.delete('/delete',deleteDoctor)

module.exports = router