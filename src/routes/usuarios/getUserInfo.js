var conn = require("../../configs/db");
var express = require("express");
var router = express.Router();
var ToolsCounter = require("../../configs/tools");
const { clearConfigCache } = require("prettier");
module.exports = (req, res) => {
    conn.consultarWhereClause(
        //SELECT
        "usuario_.id,usuario_.login, usuario_.estado, usuario_.pass, usuario_.tipo, usuario_.fk_personal",
        //FROM
        "usuario_",
        //WHERE
        "usuario_.id = " + globalIdToken,
        function (response, error) {
            if (response) {
                var valueFkPersonal = JSON.parse(response)[0].fk_personal;
                // console.log(getDataFromKey(valueFkPersonal, ""));

                res.json(JSON.parse(response));
                console.log("Datos obtenidos con éxito ");
            }
        }
    );
    function getDataFromKey(key, callback) {
        if (key.toString().lenght > 6) {
            console.log("es un empleado");
            conn.consultarWhereClause(
                //SELECT
                "personal_.dni, personal_.nombre, personal_.apellido, personal_.f_nac, personal_.legajo, personal_.estado",
                //FROM
                "personal_",
                //WHERE
                "personal_.estado = 1 AND personal_.dni = " + key
            ),
                function (response, error) {
                    return callback(response);
                };
        } else {
            console.log("es un medico");
            conn.consultarWhereClause(
                //SELECT
                "",
                //FROM
                "",
                //WHERE
                "" + globalIdToken
            );
            return callback(null);
        }
    }
};
