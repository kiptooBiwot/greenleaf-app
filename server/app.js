const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require("http-errors");
// Routes!
const employeeRoutes = require('./routes/Employees.routes')

const app = express();


const PORT = process.env.PORT || 3000

// MongoDB connection
try {
  mongoose.connect("mongodb://localhost:27017/greenleaf_app", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('MongoDB connected on port 27017...')
} catch (error) {
  console.log('MongodDB connection failed!')
  createError(error);
}

// Bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(cors())

// Middleware
// app.use('/api/v1/employees', employeeRoutes)
app.use('/api/v1/employees', employeeRoutes)


app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    error: err.message
  })
})

app.listen(PORT, () => {
  console.log('Server started port 3000...')
})