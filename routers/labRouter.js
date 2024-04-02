const express = require('express')
const router =express.Router()
const  {create,read,update,deleteTest} = require('../controllers/labController.js')
const MW  = require('../middleware.js')

router.get('/read',read)
router.post('/create',create)
router.put('/update',update)
router.delete('/delete',deleteTest)

module.exports = router