const pool = require('../database/connection'); // Make sure pool is required

// Get all vehicles
async function getAllInventory() {
  try {
    const data = await pool.query(`SELECT * FROM public.inventory`);
    return data.rows;
  } catch (error) {
    console.error("getAllInventory error:", error);
  }
}

// Get vehicles by classification ID
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error);
  }
}

// Get vehicle by ID
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [inv_id]
    );
    return data.rows[0];
  } catch (error) {
    console.error("getVehicleById error:", error);
  }
}

// Export the functions
module.exports = {
  getAllInventory,
  getInventoryByClassificationId,
  getVehicleById, 
};