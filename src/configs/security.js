const express = require('express');
const app = express();
const rutasProtegidas = express.Router(); 
const jwt = require('jsonwebtoken');
const config = require('./config')


  rutasProtegidas.use((req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];    
      if(req.headers.authorization.split(" ")[0] === "bearer" || req.headers.authorization.split(" ")[0] === "Bearer")
      {
        if (token) {
          jwt.verify(token, config.llave, (err, decoded) => {      
            if (err) {
              return res.json({ mensaje: 'Token inválida' });    
            } else {
              req.decoded = decoded;    
              next();
            }
          });
        } else {
          res.send({ 
              mensaje: 'Token vacio' 
          });
        }
      }
      else{
        res.send({
          mesanje: 'Error en el Token al tomar el formato bearer'
        })
      }
      
    } catch (error) {
      console.log(error)
      res.send({ 
        mensaje: 'Se recibio un formato de token invalido' 
    });
    }
   }); 

   module.exports = rutasProtegidas;