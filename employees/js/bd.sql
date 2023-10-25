create schema RH;

use rh;

create table employees(
	id int primary key auto_increment,
    name varchar(20),
    lastname varchar(20),
    phone char(10),
    mail varchar(100),
    address varchar(255),
    pwd varchar(50)
);

-- Insertar el primer registro
INSERT INTO employees (name, lastname, phone, mail, address, pwd)
VALUES ('Juan', 'Pérez', '1234567890', 'juan@example.com', 'Calle Principal 123', 'contraseña123');

-- Insertar el segundo registro
INSERT INTO employees (name, lastname, phone, mail, address, pwd)
VALUES ('María', 'González', '9876543210', 'maria@example.com', 'Avenida Secundaria 456', 'clave456');

-- Insertar el tercer registro
INSERT INTO employees (name, lastname, phone, mail, address, pwd)
VALUES ('Carlos', 'Sánchez', '5551112222', 'carlos@example.com', 'Plaza Central 789', 'password789');

-- Insertar el cuarto registro
INSERT INTO employees (name, lastname, phone, mail, address, pwd)
VALUES ('Laura', 'López', '9998887777', 'laura@example.com', 'Calle Peatonal 101', 'miclave123');

-- Insertar el quinto registro
INSERT INTO employees (name, lastname, phone, mail, address, pwd)
VALUES ('Pedro', 'Ramírez', '4443332222', 'pedro@example.com', 'Calle de la Fuente 555', 'abcd1234');