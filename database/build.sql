-- Drop tables if they already exist (optional, for resetting)
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS classification;
DROP TYPE IF EXISTS account_type;

-- 1. Create custom ENUM type for account roles
CREATE TYPE account_type AS ENUM (
  'Client',
  'Employee',
  'Admin'
);

-- 2. Create classification table (like car categories)
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(255) NOT NULL
);

-- 3. Create inventory table (car listings)
CREATE TABLE inventory (
  inventory_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(255) NOT NULL,
  inv_model VARCHAR(255) NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  inv_price NUMERIC(10, 2) NOT NULL,
  inv_year INT NOT NULL,
  inv_miles INT,
  inv_color VARCHAR(50),
  classification_id INT REFERENCES classification(classification_id)
);

-- 4. Insert sample data into classification
INSERT INTO classification (classification_name)
VALUES ('Classic'), ('Sport'), ('Luxury');

-- 5. Insert sample data into inventory
INSERT INTO inventory (
  inv_make, inv_model, inv_description, inv_image, inv_thumbnail, 
  inv_price, inv_year, inv_miles, inv_color, classification_id
) VALUES 
(
  'DMC', 'Delorean', 
  'A futuristic car from the 80s with style and flair.', 
  '/images/hero-car.jpg', 
  '/images/hero-car-thumb.jpg', 
  32000.00, 1981, 90000, 'Silver', 1
),
(
  'Tesla', 'Model S', 
  'High-tech, all electric luxury sedan with amazing performance.', 
  '/images/tesla-models.jpg', 
  '/images/tesla-thumb.jpg', 
  85000.00, 2023, 15000, 'Red', 3
);