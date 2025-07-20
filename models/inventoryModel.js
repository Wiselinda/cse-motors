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

// Get vehicles by classification name
async function getInventoryByClassification(classification_name) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory i 
       JOIN classification c ON i.classification_id = c.classification_id 
       WHERE c.classification_name = $1`,
      [classification_name]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassification error:", error);
    throw error;
  }
}

async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory WHERE classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    throw error;
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

module.exports = {
  getAllInventory,
  getInventoryByClassificationId,
  getInventoryByClassification, // ✅ Add this
  getVehicleById,
};