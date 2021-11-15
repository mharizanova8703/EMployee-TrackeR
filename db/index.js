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
}

module.exports = new DB(connection)
