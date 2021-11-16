//Dependencies
const inquirer = require('inquirer')
const connection = require('./connection')
const cTable = require('console.table')



showList()

function showList() {
  inquirer
    .prompt({
      type: 'list',
      choices: [
        'Add department',
        'Add role',
        'Add employee',
        'View departments',
        'View roles',
        'View employees',
        'Update employee role',
        'Quit',
      ],
      message: 'Make your selection?',
      name: 'option',
    })
    .then((response) => {
      let userChoice = response.option
      console.log('userChoice', userChoice)
      switch (userChoice) {
        case 'Add department':
          addDepartment()
          break
        case 'Add role':
          addRole()
          break
        case 'Add employee':
          addEmployee()
          break
        case 'View departments':
          showDepartments()
          break
        case 'View roles':
          showRoles()
          break
        case 'View employees':
          showEmployees()
          break
        case 'Update employee role':
          updateEmployee()
          break
        default:
          end()
      }
    })
}

//   });
//     })
function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What is the name of the department?',
      name: 'deptName',
    })
    .then(function (answer) {
      connection.query(
        'INSERT INTO departments (name) VALUES (?)',
        [answer.deptName],
        function (err, rows) {
          if (err) throw err
          console.table(rows)
          showList()
        },
      )
    })
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: "What's the first name of the employee?",
      name: 'FirstName',
    },
    {
      type: 'input',
      message: "What's the last name of the employee?",
      name: 'LastName',
    },
    {
      type: '',
      message: "What is the employee's role id number?",
      name: 'roleID',
    },
    {
      type: 'list',
      message: 'What is the manager id number?',
      name: 'managerID',
    },
  ])
}
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "What's the name of the role?",
        name: 'roleName',
      },
      {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'salaryTotal',
      },
    ])
    .then(function (answer) {
      connection.query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.roleName, answer.salaryTotal, answer.deptID],
        function (err, res) {
          if (err) throw err
          console.table(res)
          showList()
        },
      )
    })
}

function updateEmployee() {}
function showDepartments() {
  // select from the db
  let query = 'SELECT * FROM departments'
  connection.query(query, function (err, rows) {
    if (err) throw err
    console.table(rows)
    showList()
  })
}
function showRoles() {
  // select from the db
  let query = 'SELECT * FROM roles'
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    showList()
  })
  // show the result to the user (console.table)
}

function showEmployees() {
  // select from the db
  let query = 'SELECT * FROM employees'
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    showList()
  })
}

function end() {
  connection.end()
  process.exit()
}
