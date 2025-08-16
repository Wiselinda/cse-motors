const pool = require("../database/")

/* ***************************
 *  Get all reviews for a vehicle
 * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const sql = `
      SELECT r.review_id, r.review_text, r.rating, r.created_at,
             a.account_firstname, a.account_lastname
      FROM public.review AS r
      JOIN public.account AS a ON r.account_id = a.account_id
      WHERE r.inv_id = $1
      ORDER BY r.created_at DESC
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByInvId error " + error)
  }
}

/* ***************************
 *  Add a new review
 * ************************** */
async function addReview(inv_id, account_id, review_text, rating) {
  try {
    const sql = `
      INSERT INTO public.review (inv_id, account_id, review_text, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const data = await pool.query(sql, [inv_id, account_id, review_text, rating])
    return data.rows[0]
  } catch (error) {
    console.error("addReview error " + error)
  }
}

/* ***************************
 *  Delete a review by ID
 * ************************** */
async function deleteReview(review_id) {
  try {
    const sql = "DELETE FROM public.review WHERE review_id = $1"
    const data = await pool.query(sql, [review_id])
    return data
  } catch (error) {
    console.error("deleteReview error " + error)
  }
}

module.exports = { getReviewsByInvId, addReview, deleteReview }