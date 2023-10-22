const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.get("/", async (req, res, next) => {
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 200, message: emp});
});

employee.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE name = ?", [name]);
    emp !== undefined && emp.length !== 0 ?
    res.status(200).json(emp) :  res.status(404).send({code: 404, message: "Employee not found"});
});

employee.post("/", async (req, res, next) => {
    const {name, lastname, phone, mail, address, pwd} = req.body;
    if (name && lastname && phone && mail && address && pwd){
        let query = "INSERT INTO employees (name, lastname, phone, mail, address, pwd)";
        query += `VALUES ('${name}', '${lastname}', '${phone}', '${mail}', '${address}', '${pwd}')`;

        const rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Employee added successfully"});
        }
        return res.status(500).json({code: 500, message: "Error"});
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"});
});

employee.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const {name, lastname, phone, mail, address, pwd} = req.body;

    if (name && lastname && phone && mail && address && pwd){
        let query = `UPDATE employees SET name='${name}', lastname='${lastname}', phone='${phone}', mail='${mail}', address='${address}', pwd='${pwd}' WHERE id=${req.params.id}`;

        const rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Employee updated successfully"});
        }
        return res.status(500).json({code: 500, message: "Error"});
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"});
});

employee.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Employee deleted successfully"});
    }
    return res.status(404).json({code: 404, message: "Employee not found"});
});

module.exports = employee;