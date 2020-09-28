var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var app = express();
var conn = require("../../configs/db");
const md5 = require("md5");
const config = require("../../configs/config");
const { json } = require("body-parser");

app.set("llave", config.llave);

module.exports = (req, res) => {
    console.log(req.param.user);
    console.log(req.body.pass);
    conn.consultarWhereClause(
        "id,login,pass",
        "usuario_",
        'login = "' +
            req.body.user +
            '" AND pass = "' +
            md5(req.body.pass) +
            '"',
        function (rows, err) {
            if (err) {
                console.log(err);
            }
            if (!(rows !== "[]")) {
                console.log(rows);
                //error al validar usuario y contraseña
                res.json({ mensaje: "Usuario o contraseña incorrectos" });
            } else {
                const rowsParsed = JSON.parse(rows);
                const payload = {
                    user_id: rowsParsed[0].id,
                    check: true,
                };
                const token = jwt.sign(payload, app.get("llave"));
                res.json({
                    mensaje: "Autenticación correcta",
                    token: token,
                });
            }
        }
    );
};
