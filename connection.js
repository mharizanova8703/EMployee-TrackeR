const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  //  username
  user: 'root',

  password: '8703140618Mari@',
  database: 'employees_db',
})

connection.connect(function (err) {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)
})

module.exports = connection
