const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5500;

// EJS settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Static files (CSS & images)
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// ✅ API route
app.get("/api/cars", (req, res) => {
  const cars = [
    { id: 1, brand: "Toyota", model: "Corolla", year: 2020 },
    { id: 2, brand: "Honda", model: "Civic", year: 2019 },
    { id: 3, brand: "Ford", model: "Focus", year: 2021 },
  ];
  res.json(cars);
});

// ✅ Inventory route
const invRoute = require("./routes/inventoryRoute");
app.use("/inv", invRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// 404 Error handler
app.use((req, res, next) => {
  res.status(404).render("errors/error", {
    title: "404 - Not Found",
    message: "Sorry, the page you are looking for does not exist.",
  });
});

// 500 Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/error", {
    title: "500 - Server Error",
    message: "Something went wrong on the server.",
  });
});