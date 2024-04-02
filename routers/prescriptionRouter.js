const express =require('express');
const router = express.Router();
const {create,read,update,Delete} = require('../controllers/prescriptionController.js');

router.post('/create',create);
router.get('/read',read);
router.put('/update',update);
router.delete('/delete',Delete)

module.exports = router;