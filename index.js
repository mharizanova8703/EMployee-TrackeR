//Dependencies
const inquirer = require('inquirer')
const connection = require('./connection')
const cTable = require('console.table')
//const db = require(".");
showList()

function showList() {
  inquirer
    .prompt({
      type: 'list',
      choices: [
        'View departments',
        'View roles',
        'View employees',
        'Add department',
        'Add role',
        'Add employee',
        'Update employee role',
        'Quit',
      ],
      message: 'Make your selection?',
      name: 'option',
    })
    .then((response) => {
      let userChoice = response.option
      console.log('You entered:' + response.option)

      switch (userChoice) {
        case 'View departments':
          showDepartments()
          break
        case 'View roles':
          showRoles()
          break
        case 'View employees':
          showEmployees()
          break
        case 'Add department':
          addDepartment()
          break
        case 'Add role':
          addRole()
          break
        case 'Add employee':
          addEmployee()
          break
        case 'Update employee role':
          updateEmployee()
          break
        default:
          end()
      }
    })
}
function showDepartments() {
  let query = 'SELECT * FROM departments'
  connection.query(query, function (err, rows) {
    if (err) throw err
    console.table(rows)
    showList()
  })
}
function showRoles() {
  let query = 'SELECT * FROM roles'
  connection.query(query, function (err, rows) {
    if (err) throw err
    console.table(rows)
    showList()
  })
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
        (err, res) => {
          if (err) throw err
          console.table(res)

          showDepartments()
        }
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

//let department_id = []

function addRole() {
  connection.query(`SELECT title FROM roles`, (err, titles) => {
    if (err) throw err
    console.log(titles)
    roleOptions = titles[0].title
    console.log(roleOptions)
  })

  inquirer
    .prompt([
      {
        type: 'input',
        message: "What's the name of the employee role?",
        name: 'title',
      },
      {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'salary',
      },
      {
        type: 'input',
        message: 'What is the department ID?',
        name: 'department_id',
      },
    ])
    .then(function (answers) {
      var title = answers.title
      var salary = answers.salary
      var department_id = answers.deptName
      console.log(salary)
      console.log(deptName)

      connection.query(
        `SELECT id FROM department_id WHERE department_id = "${answers.deptName}"`,
        (err, deptName) => {
          const id = deptName[0].id
        },
      )

      connection.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ("${title}", "${department_id}", "${salary}",)`,
        (err, deptName) => {
          if (err) throw err
          console.table(rows)
          showList()
        },
      )
    })
}

function updateEmployee() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'For which employee would you like to update the role?',
      name: 'role_id',
    },
    {
      type: 'list',
      message: "What is the employee's new role?",
      name: 'titleID',
      choices: showroles,
    },
  ])
}
// console.l
function end() {
  connection.end()
  process.exit()
}
