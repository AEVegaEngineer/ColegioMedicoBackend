module.exports = {
    consultar,
    consultarWhereClause,
    consultarWhereClauseNoJSON,
};
//DATOS DE CONEXION
let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "intranet",
});

function consultarWhereClause(campos, tabla, where, callback) {
    connection.query(
        "SELECT " + campos + " from " + tabla + " WHERE " + where,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                return callback(
                    JSON.stringify({
                        mensaje:
                            "Ocurrio un error al comunicarnos con la base de datos.",
                    })
                );
            }
            if (rows) {
                return callback(JSON.stringify(rows));
            }
        }
    );
}
function consultarWhereClauseNoJSON(campos, tabla, where, callback) {
    connection.query(
        "SELECT " + campos + " from " + tabla + " WHERE " + where,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                return callback(
                    JSON.stringify({
                        mensaje:
                            "Ocurrio un error al comunicarnos con la base de datos.",
                    })
                );
            }
            if (rows) {
                return callback(rows);
            }
        }
    );
}
function consultar(campos, tabla, where, callback) {
    connection.query(
        "SELECT " + campos + " from " + tabla + " WHERE " + where,
        function (err, rows, fields) {
            if (err) {
                return callback(JSON.stringify(err));
            }
            if (rows) {
                return callback(JSON.stringify(rows));
            }
        }
    );
}
function Update() {
    connection.connect();
    connection.query("SELECT user, pass from login_users", function (
        err,
        rows,
        fields
    ) {
        if (err) throw err;
        //  console.log('The solution is: ', rows);
        console.log(JSON.stringify(rows));
        return JSON.stringify(rows);
    });
    connection.end();
    //  return  rows.solution.json()
}
