const utilities = require("../utilities");
const invModel = require("../models/inventoryModel");

async function buildByClassification(req, res, next) {
  const classification = req.params.classification;
  try {
    const data = await invModel.getInventoryByClassification(classification);
    const grid = await utilities.buildInventoryGrid(data);
    const nav = await utilities.getNav();
    res.render("./inventory/classification", {
      title: classification + " Vehicles",
      nav,
      grid,
    });
  } catch (error) {
    console.error("Error in buildByClassification:", error);
    next(error);
  }
}

async function buildById(req, res) {
  const invId = parseInt(req.params.inv_id);
  const data = await invModel.getVehicleById(invId);
  if (!data) {
    return res.status(404).send("Vehicle not found");
  }

  const nav = await utilities.getNav();
  res.render("./inventory/vehicle-detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    vehicle: data,
  });
}

// ✅ New Function: List of Classifications
async function buildClassificationList(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("./inventory/classification-list", {
      title: "Vehicle Classifications",
      nav,
    });
  } catch (error) {
    console.error("Error in buildClassificationList:", error);
    next(error);
  }
}

// ✅ Show Vehicle Details by Inventory ID
async function buildInventory(req, res, next) {
  const invId = parseInt(req.params.inv_id);
  try {
    const data = await invModel.getVehicleById(invId);

    if (!data) {
      res.status(404).send("Vehicle not found");
      return;
    }

    const nav = await utilities.getNav();
    res.render("./inventory/vehicle-detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      nav,
      vehicle: data,
    });
  } catch (error) {
    console.error("Error in buildInventory:", error);
    next(error);
  }
}

module.exports = {
  buildClassificationList,
  buildByClassification,
  buildInventory,
  buildById,
};