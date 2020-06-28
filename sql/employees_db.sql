DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departments
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
    (30) NOT NULL


);


--------------------------------------------------
    CREATE TABLE roles
    (
        id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR
        (30) NOT NULL,
        salary DECIMAL
        (10, 3) NOT NULL,
        department_id INT NOT NULL
);
-------------------------------------------------------
        CREATE TABLE employees
        (
            id INT NOT NULL
            AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR
            (30) NOT NULL,
        last_name VARCHAR
            (30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT NULL
);

    INSERT INTO employees
        (first_name, last_name, role_id, manager_id)
    VALUES
        ("vanilla","ice",69,1),("Jonathan","Jostar",39, NULL),("Dio","Brando",34,1);