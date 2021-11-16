//Dependencies
const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = require('./db')

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
  inquirer.prompt({
    type: 'input',
    message: 'What is the name of the department?',
    name: 'deptName',
  })
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: "What's the first name of the employee?",
      name: 'eeFirstName',
    },
    {
      type: 'input',
      message: "What's the last name of the employee?",
      name: 'eeLastName',
    },
    {
      type: 'input',
      message: "What is the employee's role id number?",
      name: 'roleID',
    },
    {
      type: 'input',
      message: 'What is the manager id number?',
      name: 'managerID',
    },
  ])
}
function addRole() {
  inquirer.prompt([
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
    {
      type: 'input',
      message: 'What is the department id number?',
      name: 'deptID',
    },
  ])
}

function updateEmployee() {
  
}

function showDepartments() {
  db.getAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => showList())
}

function showRoles() {
  db.getAllRoles()
    .then(([rows]) => {
      let roles = rows
      console.table(roles)
    })
    .then(() => showList())
}

function showEmployees() {
  db.getAllEmployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(() => showList())
}

function end() {
  connection.end()
  process.exit()
}
