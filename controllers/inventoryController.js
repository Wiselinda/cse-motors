const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities/");

const getVehicleDetail = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id);
    const data = await inventoryModel.getVehicleById(inv_id);

    if (!data) {
      return next(new Error("Vehicle not found"));
    }

    const vehicleDetailHtml = utilities.buildVehicleDetail(data);
    const nav = await utilities.getNav();

    res.render("inventory/detail", {
      title: '${data.inv_make} ${data.inv_model}',
      nav,
      vehicleDetailHtml,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVehicleDetail,
};