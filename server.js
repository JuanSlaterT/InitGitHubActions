
const app = require('./app');

const http = require('http');

const PORT = process.env.PORT || 3000;

app.set('port', PORT)

const server = http.createServer(app)

server.listen(PORT)

server.on('listening', onListening);


function onListening() {

    console.log(`Escuchando en el puerto ${PORT}`)

}