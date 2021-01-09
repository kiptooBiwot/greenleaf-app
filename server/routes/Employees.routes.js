const router = require('express').Router()
const employeeController = require('../controllers/Employee.controller')

router.get('/', employeeController.getEmployees)

module.exports = router