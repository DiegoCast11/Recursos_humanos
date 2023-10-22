const express = require('express');
const app = express();
const employee = require('./routes/employee');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/employee', employee);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api', (req, res) => {
    return res.status(200).send(req.body);
});

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: 'Route' + req.url + ' Not found.' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});