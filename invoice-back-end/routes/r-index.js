const express = require('express');
const apiController = require('../controllers/apiController')

let router = express.Router();

router.post('/invoice', apiController.createInvoice);
router.get('/invoice', apiController.getInvoices);
router.get('/generate-invoice', apiController.generateInvoice);
router.get('/email-invoice', apiController.emailInvoice);
module.exports = router;