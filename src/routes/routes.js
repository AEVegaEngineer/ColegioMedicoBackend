const express = require("express");
var router = express.Router();
const app = express();
const autenticar = require("../routes/autenticar/autenticar");
const notificaciones = require("../routes/notificaciones/notificaciones");
const validaciones_sancor = require("../routes/validaciones/sancor");
const getUserInfo = require("../routes/usuarios/getUserInfo");

//le asignamos la seguridad a las rutas
const security = require("../configs/security");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

// Define the home page route
router.post("/", function (req, res) {
    const saludar = {
        mensaje:
            "Hola, bienvenido a la API de Colegio Médico. Para consultar por endpoints ponte en contacto con ti@colegiomedico.org.ar",
    };
    res.status = 200;
    res.send(JSON.stringify(saludar));
});

router.get("/", function (req, res) {
    const saludar = {
        mensaje:
            "Hola, bienvenido a la API de Colegio Médico. Para consultar por endpoints ponte en contacto con ti@colegiomedico.org.ar",
    };
    res.status = 200;
    res.send(JSON.stringify(saludar));
});

router.post("/autenticar", autenticar);

//Example Route
router.get("/datos", security, (req, res) => {
    const datos = [
        { id: 1, nombre: "Asfo" },
        { id: 2, nombre: "Denisse" },
        { id: 3, nombre: "Carlos" },
    ];
    res.json(datos);
});

router.get("/getNotificaciones", security, notificaciones);

router.get("/validateSanCor", security, validaciones_sancor);

router.get("/getUserInfo", security, getUserInfo);
module.exports = router;
