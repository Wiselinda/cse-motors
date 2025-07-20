const util = {};

util.buildVehicleDetail = function (vehicle) {
  // Format price and mileage
  const formattedPrice = vehicle.inv_price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedMiles = vehicle.inv_miles.toLocaleString("en-US");

  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${formattedPrice}</p>
        <p><strong>Miles:</strong> ${formattedMiles}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </div>
  `;
};

module.exports = util;