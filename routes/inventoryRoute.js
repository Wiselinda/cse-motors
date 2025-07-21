 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

router.get("/type/:classificationId", invController.buildByClassificationId);


router.get("/detail/:id", 
utilities.handleErrors(invController.buildDetail))


router.get(
  "/broken",
  utilities.handleErrors(invController.throwError)
)


module.exports = router;