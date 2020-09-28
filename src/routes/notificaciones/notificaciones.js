var conn = require("../../configs/db");
var express = require("express");
var router = express.Router();
const variables = "";
var resultados = [];

module.exports = (req, res) => {
    conn.consultarWhereClauseNoJSON(
        "app_notif_cuerpo.id_cuerpo,app_notif_cuerpo.fk_cabecera, app_notif_cuerpo.fk_user_objetivo, app_notif_cuerpo.f_hs_leido, app_notif_cuerpo.estado, app_notif_cuerpo.f_hs_ultimo_envio, app_notif_cabecera.id_cabecera, app_notif_cabecera.asunto, app_notif_cabecera.mensaje, app_notif_cabecera.f_hs_creado, app_notif_cabecera.fk_user_escribe",
        "app_notif_cuerpo INNER JOIN app_notif_cabecera	ON 	app_notif_cuerpo.fk_cabecera = app_notif_cabecera.id_cabecera INNER JOIN usuario_ ON app_notif_cuerpo.fk_user_objetivo = usuario_.id",
        "app_notif_cuerpo.estado = 0 AND usuario_.id = " + globalIdToken,
        function (response, error) {
            if (response) {
                console.log(response);
                resultados.push(response);
                conn.consultarWhereClauseNoJSON(
                    "app_notif_cuerpo.id_cuerpo,app_notif_cuerpo.fk_cabecera, app_notif_cuerpo.fk_user_objetivo, app_notif_cuerpo.f_hs_leido, app_notif_cuerpo.estado, app_notif_cuerpo.f_hs_ultimo_envio, app_notif_cabecera.id_cabecera, app_notif_cabecera.asunto, app_notif_cabecera.mensaje, app_notif_cabecera.f_hs_creado, app_notif_cabecera.fk_user_escribe",
                    "app_notif_cuerpo INNER JOIN app_notif_cabecera	ON 	app_notif_cuerpo.fk_cabecera = app_notif_cabecera.id_cabecera INNER JOIN usuario_ ON app_notif_cuerpo.fk_user_objetivo = usuario_.id",
                    "app_notif_cuerpo.estado = 1 AND usuario_.id = " +
                        globalIdToken +
                        " LIMIT 100",
                    function (response, error) {
                        if (response) {
                            console.log(response);
                            resultados.push(response);
                            // console.log(resultados);
                            console.log("Notificaciones enviadas con éxito");
                            res.json(resultados);
                        }
                    }
                );
            }
        }
    );
};
