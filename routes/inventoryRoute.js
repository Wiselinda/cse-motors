const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification ID
router.get("/type/:classification_id", invController.buildByClassificationId);

// Route to build vehicle detail view by inventory ID
router.get("/detail/:inv_id", invController.buildByInventoryId);

module.exports = router;