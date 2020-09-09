var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var app = express();
var conn = require("../../configs/db");
const md5 = require("md5");
const config = require("../../configs/config");

app.set("llave", config.llave);

module.exports = (req, res) => {
    conn.consultarWhereClause(
        "login,pass",
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
                console.log(rows);
                const payload = {
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
