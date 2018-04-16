DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE IF NOT EXISTS bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name varchar (50) NOT NULL,
  department_name varchar (50) NOT NULL,
  price decimal (5,2) NOT NULL,
  stock_quantity integer (50),
  PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hiking Boots", "apparel", 129.99, 5),
 ("Sandals", "apparel", 89.99, 5),
 ("Tent", "equipment", 99.99, 3),
 ("Lantern", "equipment", 39.99, 6),
 ("Camp Stove", "equipment", 89.99, 5),
 ("Kayak", "equipment", 699.99, 5),
 ("Roof rack", "auto accesories", 199.99, 5),
 ("Roof storage", "auto accessories", 399.99, 5),
 ("Pots and pans set", "equipment", 49.99, 1),
 ("Plates and cups", "equipment", 49.99, 5),
 ("Tarp", "equipment", 19.99, 1),
 ("Climbing rope", "equipment", 49.99, 3);

SELECT * FROM products;
