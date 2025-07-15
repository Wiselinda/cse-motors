/* **************
 * Build vehicle detail view HTML
 * **************/
function buildVehicleDetailHTML(vehicle) {
  let html = `
    <section class="vehicle-detail">
      <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <div class="vehicle-detail-content">
        <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        <div class="vehicle-detail-info">
          <p><strong>Price:</strong> $${Number(vehicle.inv_price).toLocaleString()}</p>
          <p><strong>Miles:</strong> ${Number(vehicle.inv_miles).toLocaleString()}</p>
          <p><strong>Color:</strong> ${vehicle.inv_color}</p>
          <p><strong>Category:</strong> ${vehicle.classification_name}</p>
          <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        </div>
      </div>
    </section>
  `
  return html
}

module.exports = {
  getNav,
  buildClassificationGrid,
  buildVehicleDetailHTML, 
};