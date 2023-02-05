const express = require('express');
const expenseController = require('../controllers/expenseController');
const userAuth = require('../middlewares/auth')

const router = express.Router();

router.post('/addex',userAuth.authenticate,  expenseController.addex);
router.get('/getAll',userAuth.authenticate, expenseController.getAll );
router.post('/delete',userAuth.authenticate, expenseController.deleteOne);
module.exports = router;