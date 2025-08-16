// routes/reviewRoute.js
const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")

// Show add review form
router.get("/add/:inv_id", reviewController.buildAddReview)

// Handle review submission
router.post("/add", reviewController.addReview)

// Edit review form
router.get("/edit/:review_id", reviewController.buildEditReview)

// Handle edit submission
router.post("/update", reviewController.updateReview)

// Delete confirmation page
router.get("/delete/:review_id", reviewController.buildDeleteReview)

// Handle deletion
router.post("/delete", reviewController.deleteReview)

module.exports = router