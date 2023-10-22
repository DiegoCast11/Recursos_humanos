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
module.exports = employee;