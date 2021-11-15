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
function showDepartments() {
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
        function (err, res) {
          if (err) throw err
          console.table(res)
          showList()
        },
      )
    })
}

function addRole() {}

// function addEmployee(){
// inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "What's the first name of the employee?",
//         name: "FirstName"
//       },
//       {
//         type: "input",
//         message: "What's the last name of the employee?",
//         name: "LastName"
//       },
//       {
//         type: "input",
//         message: "What is the employee's role id number?",
//         name: "roleID"
//       },
//       {
//         type: "input",
//         message: "What is the manager id number?",
//         name: "managerID"
//       }
//     ])
//      .then(function(answer) {

//       connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.FirstName, answer.LastName, answer.roleID, answer.managerID], function(err, res) {
//         if (err) throw err;
// console.table(res);
// showList();

//   });
//     })
function addDepartment() {}
function addEmployee() {}
function addRole() {}
function updateEmployee() {}
function showDepartments() {}
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
