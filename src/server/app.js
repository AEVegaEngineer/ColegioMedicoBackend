const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());
// 4
app.listen(3000,()=>{console.log('Servidor iniciado en el puerto 3000') });
// 5
app.use(require('../routes/routes'))

app.use(express.static('public'));
