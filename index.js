//Dependencies
const inquirer = require('inquirer')
const connection = require('./connection')
const cTable = require('console.table')

//const db = require('./db')
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
      console.log(userChoice)
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
        name: 'department_name',
      },
    ])
    .then((answer) => {
      var department_name = answer.department_name

      console.log(
        `\n
         ${department_name} into department table!\n`,
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
        type: 'input',
        message: 'What is the employees role?',

        name: 'title',
      },

      {
        type: 'list',
        message: 'Who is the employees manager?',
        name: 'manager_id',
        choices: [
          'Cardiologist',
          'Neurologist',
          'Radiologist',
          'Pathologist',
          'Pharmacist',
          'Administrator',
          'Manager',
          'HR',
          'Emergency Room Nurse',
          'Home Care Registered Nurse',
          'Surgical Registered Nurse',
        ],
      },
    ])
    .then(function (answer) {
      connection.query('Select title, id from roles', function (err, results) {
        if (err) throw err
        console.log(results)
        for (var i = 0; i < results.length; i++) {
          console.log(
            'we are comparing ',
            results[i].title,
            'to ',
            answer.role_id,
          )
          if (results[i].title === answer.role_id) {
            let role_id = results[i].id
            connection.query(`SELECT title FROM roles`, (err, titles) => {
              if (err) throw err
              console.log(title)
              roleOptions = title[0].title
              console.log(roleOptions)
            })
            connection.query(
              `SELECT first_name FROM employees`,
              (err, manager) => {
                if (err) throw err
                console.log(manager)
                managerOptions = manager[0].first_name
                console.log(managerOptions)
              },
            )
            connection.query(
              `Insert into employee (first_name, last_name, role_id) values (?,?,?)`,
              [answer.first_name, answer.last_name, role_id],
              function (err, results) {
                if (err) throw err
                console.log(results.affectedRows + 'employee inserted!\n')
                showList()
              },
            )
          }
        }
      })
    })
}

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
    .then(function (answer) {
      connection.query(
        'insert into department (name) values (?)',
        answer.department_id,
        function (err, results) {
          if (err) throw err
          connection.query(
            `select * from department where name= ? `,
            answer.department_id,
            function (err, res) {
              let department_id = res[0].id
              connection.query(
                'insert into roles (title, salary, department_id) values (?, ?, ?)',
                [answer.roleTitle, answer.salary, department_id],
                function (err, results) {
                  if (err) throw err
                  console.table(results)
                  showList()
                },
              )
            },
          )
        },
      )
    })
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Enter the employee's ID you want to be updated",
        name: 'updateEmploy',
      },
      {
        type: 'input',
        message: 'Enter the new role ID for that employee',
        name: 'newRole',
      },
    ])
    .then(function (res) {
      const updateEmploy = res.updateEmploy
      const newRole = res.newRole
      const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`
      connection.query(queryUpdate, function (err, res) {
        if (err) {
          throw err
        }
        console.table(res)

        showList()
      })
    })
}

function end() {
  connection.end()
  process.exit()
}
