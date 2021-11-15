const connection = require("./connection")

class DB {

    constructor(connection){
        this.connection = connection;
    }

    getAllEmployees(){
        return this.connection.promise().query(
            "SELECT * from employee;"
        )
    }







}

module.exports = new DB(connection);