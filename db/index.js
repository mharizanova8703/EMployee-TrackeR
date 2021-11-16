const connection = require('./connection')

class DB {
  constructor(connection) {
    this.connection = connection
  }

  getAllEmployees() {
    return this.connection.promise().query('SELECT * from employees;')
  }

  getAllRoles() {
    return this.connection.promise().query('SELECT * from roles;')
  }
  getAllDepartments() {
    return this.connection.promise().query('SELECT * from departments;')
  }
}

module.exports = new DB(connection)
