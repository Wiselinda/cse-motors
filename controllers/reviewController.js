// controllers/reviewController.js
const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const reviewCont = {}

/* ***************************
 *  Build add review form
 * ************************** */
reviewCont.buildAddReview = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()

  const vehicle = await invModel.getInventoryById(inv_id)
  if (!vehicle) {
    req.flash("notice", "Vehicle not found.")
    return res.redirect("/inv/")
  }

  const vehicleTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
  res.render("./reviews/add", {
    title: `Add Review for ${vehicleTitle}`,
    nav,
    errors: null,
    inv_id,
    account_id: res.locals.accountData.account_id,
    review_text: "",
    rating: ""
  })
}

/* ***************************
 *  Process new review submission
 * ************************** */
reviewCont.addReview = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { inv_id, account_id, review_text, rating } = req.body

  const insertResult = await reviewModel.addReview(inv_id, account_id, review_text, rating)

  if (insertResult) {
    req.flash("notice", "Your review has been added successfully.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, your review could not be submitted.")
    res.status(501).render("./reviews/add", {
      title: "Add Review",
      nav,
      errors: null,
      inv_id,
      account_id,
      review_text,
      rating
    })
  }
}

/* ***************************
 *  Build edit review form
 * ************************** */
reviewCont.buildEditReview = async function (req, res, next) {
  const review_id = parseInt(req.params.review_id)
  let nav = await utilities.getNav()

  const review = await reviewModel.getReviewById(review_id)
  if (!review) {
    req.flash("notice", "Review not found.")
    return res.redirect("/")
  }

  res.render("./reviews/edit", {
    title: "Edit Review",
    nav,
    errors: null,
    review_id: review.review_id,
    inv_id: review.inv_id,
    review_text: review.review_text,
    rating: review.rating
  })
}

/* ***************************
 *  Process review update
 * ************************** */
reviewCont.updateReview = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { review_id, inv_id, review_text, rating } = req.body

  const updateResult = await reviewModel.updateReview(review_id, review_text, rating)

  if (updateResult) {
    req.flash("notice", "Your review has been updated.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("./reviews/edit", {
      title: "Edit Review",
      nav,
      errors: null,
      review_id,
      inv_id,
      review_text,
      rating
    })
  }
}

/* ***************************
 *  Build delete review confirmation
 * ************************** */
reviewCont.buildDeleteReview = async function (req, res, next) {
  const review_id = parseInt(req.params.review_id)
  let nav = await utilities.getNav()

  const review = await reviewModel.getReviewById(review_id)
  if (!review) {
    req.flash("notice", "Review not found.")
    return res.redirect("/")
  }

  res.render("./reviews/delete", {
    title: "Delete Review",
    nav,
    errors: null,
    review_id: review.review_id,
    inv_id: review.inv_id,
    review_text: review.review_text
  })
}

/* ***************************
 *  Process review deletion
 * ************************** */
reviewCont.deleteReview = async function (req, res, next) {
  const { review_id, inv_id } = req.body

  const deleteResult = await reviewModel.deleteReview(review_id)

  if (deleteResult) {
    req.flash("notice", "The review was successfully deleted.")
  } else {
    req.flash("notice", "Sorry, the delete failed.")
  }
  res.redirect(`/inv/detail/${inv_id}`)
}

module.exports = reviewCont