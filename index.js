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

// Function to add a new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'deptName',
      },
    ])
    .then((answer) => {
      var department_name = answer.deptName

      console.log(
        `\nSuccessfully added ${department_name} into department table!\n`,
      )

      connection.query(
        `INSERT INTO departments (department_name) VALUES ("${department_name}")`,
      ),
        (err, rows) => {
          if (err) throw err
        }
      showDepartments()
    })
}

let roleOptions = []
let managerOptions = []
function addEmployee() {
  connection.query(`SELECT title FROM roles`, (err, titles) => {
    if (err) throw err
    console.log(titles)
    roleOptions = titles[0].title
    console.log(roleOptions)
  })
  connection.query(`SELECT first_name FROM employees`, (err, manager) => {
    if (err) throw err
    console.log(manager)
    managerOptions = manager[0].first_name
    console.log(managerOptions)
  })

  inquirer
    .prompt([
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
        type: 'list',
        message: 'What is the employees role?',
        choices: roleOptions,
        name: 'title',
      },

      {
        type: 'list',
        message: 'Who is the employees manager?',
        choices: managerOptions,
        name: 'manager',
      },
    ])
    .then(function (answers) {
      var firstName = answers.FirstName
      var lastName = answers.LastName
      var jobTitle = answers.title
      var manager = answers.manager

      connection.query(
        `SELECT id FROM roles WHERE title = "${answers.title}"`,
        (err, jobTitle) => {
          const id = jobTitle[0].id
        },
      )

      connection.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${jobTitle}", "${manager}")`,

        function (err, rows) {
          if (err) throw err
          console.table(rows)
          showList()
        },
      )
    })
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
        function (err, rows) {
          if (err) throw err
          console.table(rows)
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
