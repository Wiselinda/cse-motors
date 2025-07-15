const pool = require("../database/");

async function getVehicleById(inv_id) {
  try {
    const result = await pool.query(
      `SELECT i.*, c.classification_name
       FROM inventory AS i
       JOIN classification AS c
       ON i.classification_id = c.classification_id
       WHERE inv_id = $1`,
      [inv_id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllClassifications,
  getInventoryByClassificationId,
  getInventoryById, 
};