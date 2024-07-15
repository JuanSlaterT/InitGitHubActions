
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('¡Prueba para el enunciado de Pipelines!')
})

app.use(express.json())

module.exports = app;