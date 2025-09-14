const  express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

//setting app 
app.set('port', process.env.PORT || 3443);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//envio de dato seleccion de profesional 
app.post('/abogado', (req, res) => {
    const { abogado } = req.body;
    res.json({
        mensaje: "profesional encontrado",
        datos: { abogado }
    });
});


// Consultar disponibilidad (POST)
app.post('/disponibilidad', (req, res) => {
    const { abogado } = req.body;
    // Simulación de disponibilidad
    res.json({
        abogado,
        disponibilidad: [
            { fecha: "2025-10-02", horas: ["09:00", "10:00", "11:00"] },
            { fecha: "2025-10-03", horas: ["12:00", "13:00"] }
        ]
    });
});

//routes endpoints para enviar fecha y hora reservada
app.get('/fecha', (req, res) => {
    const { fecha, horas, abogado } = req.query; //es por que espera una respuesta

    // Simulación de fecha

    res.json({
        mensaje: "Reserva enviada correctamente",
       datos: { fecha, horas, abogado }
    });
});

//routes endpoints para post de datos de contacto
// app.post('/reserva', (req, res) => {
//    const { nombre, email, telefono, direccion, motivo } = req.body;
//    res.json({
//mensaje: "Datos de contacto recibidos correctamente",
//        datos: { nombre, email, telefono, direccion, motivo }
//    });
//});

// recepciono datos de la reserva

// levantando el servicio HTTP
// app.listen(app.get('port'), () => {
//    console.log(`Servidor iniciado! ${app.get('port')}`);
//  });
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
},
app);

  sslServer.listen(app.get('port'),() => 
    console.log(`Servidor HTTPS iniciado en el puerto! ${app.get('port')}`));