const utilities = require("../utilities/");
const invModel = require("../models/inventory-model");

async function buildByInventoryId(req, res, next) {
  try {
    const invId = parseInt(req.params.inv_id);
    const data = await invModel.getInventoryById(invId);
    
    if (!data) {
      throw new Error("Vehicle not found");
    }

    const vehicleName = '${data.inv_make} ${data.inv_model}';
    const nav = await utilities.getNav();
    const vehicleHTML = utilities.buildVehicleDetailHTML(data);

    res.render("inventory/detail", {
      title: '${vehicleName} Details',
      nav,
      vehicleHTML,
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildByClassificationId,
  buildByInventoryId,
};