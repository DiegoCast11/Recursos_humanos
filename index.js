//Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
//Routes
const employee = require('./routes/employee');
const login = require('./routes/login');
//Middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', index);
app.use('/login', login);
app.use(auth);
app.use('/employee', employee);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});