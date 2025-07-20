const pool = require('../database/connection');

const util = {};

// 🔧 Render nav
util.getNav = async function () {
  try {
    const data = await pool.query("SELECT * FROM classification ORDER BY classification_name");
    let nav = `<ul class="navigation"><li><a href="/" title="Home page">Home</a></li>`;
    data.rows.forEach(row => {
      nav += `<li><a href="/inventory/type/${row.classification_name}" title="See our ${row.classification_name} inventory">${row.classification_name}</a></li>`;
    });
    nav += `</ul>`;
    return nav;
  } catch (error) {
    console.error("getNav error:", error);
  }
};

// 🔧 Build inventory grid
util.buildInventoryGrid = async function (inventoryData) {
  if (!inventoryData || inventoryData.length === 0) return "<p>No vehicles found.</p>";

  let grid = '<ul id="inv-display">';
  inventoryData.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inventory/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <h2>
            <a href="/inventory/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${vehicle.inv_price.toLocaleString()}</span>
        </div>
      </li>
    `;
  });
  grid += '</ul>';
  return grid;
};

module.exports = util;