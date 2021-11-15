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
        case 'View employees':
          showEmployee()
          break
      }
    })
}
function showDepartment() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What is the name of the department?',
      name: 'deptName',
    })
    .then(function (answer) {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
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
//     });

function updateEmployee() {}
function showDepartment() {}
function showRoles() {}

function showEmployee() {
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
