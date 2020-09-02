const { response } = require('express');
// const { constant } = require('async');

const express = require('express'),
      conn = require('../connection/Conexion'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      config = require('../configs/config'),
      app = express();
      // async = require('async');
// 1

var stackFunctions = []

app.set('llave', config.llave);
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());
// 4
app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});
// 5
app.get('/', function(req, res) {
  const saludar={
    mensaje:"Hola, bienvenido a la API de Colegio Médico. Para consultar por endpoints ponte en contacto con ti@colegiomedico.org.ar"
  }
    res.status=200
    res.send(JSON.stringify( saludar));
});
app.post('/', function(req, res) {
  const saludar={
    mensaje:"Hola, bienvenido a la API de Colegio Médico. Para consultar por endpoints ponte en contacto con ti@colegiomedico.org.ar"
  }
    res.status=200
    res.send(JSON.stringify( saludar));
});
 

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];    
    if(req.headers.authorization.split(" ")[0] === "bearer" || req.headers.authorization.split(" ")[0] === "Bearer")
    {
      if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {      
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
 

app.post('/autenticar', (req, res) => {
  console.log(req.body.user)
  console.log(req.body.pass)
  conn.consultar('user,pass','login_users','user = "'+req.body.user+'" AND pass = "'+req.body.pass+'"',function(rows,err){
    if(err)
    {
      console.log(err)
    }
    if(!(rows !== '[]'))
    {
      console.log(rows)
      //error al validar usuario y contraseña
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
    else {
      console.log(rows)
      const payload = {
        check:  true
        };
      const token = jwt.sign(payload, app.get('llave'));
      res.json({
        mensaje: 'Autenticación correcta',
        token: token
        })
    }
  });
})

//ruta de ejemplo
app.get('/datos', rutasProtegidas, (req, res) => {
  const datos = [
   { id: 1, nombre: "Asfo" },
   { id: 2, nombre: "Denisse" },
   { id: 3, nombre: "Carlos" }
  ];
  
  res.json(datos);
 });


//  app.get('/getUsers', rutasProtegidas, (req, res)=>{
//     // stackFunctions.push(
//     //   conn.consultar('user,pass','login_users','user = "'+req.query.user+'"', callback)
//     // )
    
      
//     conn.consultar('user,pass','login_users','user = "'+req.query.user+'"',function(err,rows){
//       if(err)
//       {
//         console.log(err)
//       }
//       if(rows){
//         console.log(rows)
//       }      
//     });

//    res.sendStatus=200
   
//    res.json({"saludo":"hola"})
//  })
 