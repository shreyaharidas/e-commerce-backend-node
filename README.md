# e-commerce-backend-node

sequelize and router setup

npm install sequelize mysql2 for sequelize

CREATE TABLE ec_suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    e_mail VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic BLOB, -- or use TEXT if you prefer
    registration_id VARCHAR(255) NOT NULL,
    registration_time_stamp TIMESTAMP NOT NULL
);

