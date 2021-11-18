DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) Unique not null

);
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) Unique not null,
  salary DECIMAL not null,
  department_id INT not null,
 Constraint fk_department FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE cascade
);
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) not null,
  last_name VARCHAR(30)not null,
   role_id INT ,
  manager_id INT,
 Constraint fk_role FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE cascade,
  Constraint fk_manager FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL
);