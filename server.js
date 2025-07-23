const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const pgSession = require("connect-pg-simple")(session);
const dotenv = require("dotenv").config();

const app = express();

// Custom modules
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const staticRoutes = require("./routes/static");
const utilities = require("./utilities");
const pool = require("./database"); // PostgreSQL connection

// Set view engine and layouts
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // main layout file

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // to serve /public/images, CSS, etc.

// Session middleware
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: "sessionId",
    cookie: { secure: false }, // Set to true with HTTPS
  })
);

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Routes
app.use("/", staticRoutes); // home, about, etc.
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use("/inv", inventoryRoute); // inventory-related routes

// 404 Handler
app.use(async (req, res, next) => {
  let nav = await utilities.getNav();
  res.status(404).render("errors/error", {
    title: "404 - Not Found",
    message: "Sorry, we couldn't find that page.",
    nav,
  });
});

// Error Handler
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at "${req.originalUrl}": ${err.message}`);
  res.status(err.status || 500).render("errors/error", {
    title: err.status || "Server Error",
    message: err.message || "Something went wrong.",
    nav,
  });
});

// Start server
const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`App is running at http://${HOST}:${PORT}`);
});




