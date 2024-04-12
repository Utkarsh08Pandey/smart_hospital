const express =require('express');
const router = express.Router();
const  {create,read,update,Delete} = require('../controllers/labTestAssignController.js');

router.post('/create',create)
router.get('/read',read)
router.post('/update',update)
router.delete('/delete/:id',Delete)


module.exports = router;