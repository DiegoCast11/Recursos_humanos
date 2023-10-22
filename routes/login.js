const express = require('express');
const jwt = require('jsonwebtoken');
const login = express.Router();
const db = require('../config/database');

login.post("/", async (req, res, next) => {
    const { mail, pwd } = req.body;
    const query = `SELECT * FROM employees WHERE mail='${mail}' AND pwd='${pwd}'`;
    const rows = await db.query(query);

    if (mail && pwd) {
        if (rows.length == 1) {
            const token = jwt.sign({
                id: rows[0].id,
                mail: rows[0].mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        }
        return res.status(200).json({ code: 401, message: "User or password incorrect" });
    }
    return res.status(500).json({ code: 500, message: "Fields incomplete" });
});

module.exports = login;