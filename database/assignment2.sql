-- Drop existing objects if they exist (for rebuilds)
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS classification;
DROP TABLE IF EXISTS account;
DROP TYPE IF EXISTS account_type;

-- 1. Create ENUM type for account roles
CREATE TYPE account_type AS ENUM ('Admin', 'Employee', 'Client');

-- 2. Create account table
CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(255) NOT NULL,
  account_lastname VARCHAR(255) NOT NULL,
  account_email VARCHAR(255) UNIQUE NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type account_type DEFAULT 'Client'
);

-- 3. Create classification table
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(255) UNIQUE NOT NULL
);

-- 4. Create inventory table
CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
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

-- 5. Insert into classification table
INSERT INTO classification (classification_name)
VALUES ('SUV'), ('Truck'), ('Sedan');

-- 6. Insert into inventory table
INSERT INTO inventory (
  inv_make, inv_model, inv_description, inv_image, inv_thumbnail,
  inv_price, inv_year, inv_miles, inv_color, classification_id
)
VALUES (
  'Jeep', 'Wrangler', 'Rugged off-road SUV', '/images/wrangler.jpg', '/images/thumbs/wrangler.jpg',
  32000.00, 2021, 15000, 'Black', 1
);

-- ---------------------------------------
-- TASK 1 QUERIES START HERE
-- ---------------------------------------

-- 7. Insert Tony Stark into account table
INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type)
VALUES ('Tony', 'Stark', 'tony@starkindustries.com', 'IamIronMan123', 'Client');

-- 8. Update Tony Stark to Admin
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkindustries.com';

-- 9. Delete Tony Stark
DELETE FROM account
WHERE account_email = 'tony@starkindustries.com';

-- 10. Update inventory description (Jeep Wrangler)
UPDATE inventory
SET inv_description = 'Rugged off-road SUV with updated suspension and all-terrain tires'
WHERE inv_make = 'Jeep' AND inv_model = 'Wrangler';

-- 11. Select inventory with classification name
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
JOIN classification c ON i.classification_id = c.classification_id;

-- 12. Update image paths for Jeep Wrangler
UPDATE inventory
SET inv_image = '/images/wrangler-new.jpg',
    inv_thumbnail = '/images/thumbs/wrangler-new.jpg'
WHERE inv_make = 'Jeep' AND inv_model = 'Wrangler';