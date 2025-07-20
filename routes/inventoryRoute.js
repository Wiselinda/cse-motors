const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController'); 

// Route: View all inventory by classification 
router.get('/type/:classification', invController.buildByClassification);

// Route: View inventory details
router.get('/detail/:inv_id', invController.buildById);

module.exports = router;