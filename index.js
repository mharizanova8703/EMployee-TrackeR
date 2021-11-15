//Dependencies 
const inquirer = require("inquirer");
const mysql = require("mysql");

const db = require(".");


const connection = mysql.createConnection({
  host: "localhost",
PORT: 3000,
 //  username
  user: "root",

  //  password
  password: "8703140618Mari@",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

 showList();
 
});
function  showList() {
    inquirer
    .prompt({
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit"
      ],
          message: "Make your selection?",
      name: "option"
    }
);
};
function

