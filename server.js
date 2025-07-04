const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 5500;

// EJS settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files (CSS & images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
