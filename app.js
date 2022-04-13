const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express()

// lectura y parseo de body

app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: true, limit: '25mb' }))
require('dotenv').config()

// cors
app.use(cors())

app.use(fileUpload())

// directorio publico
app.use(express.static('public'))

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/forms', require('./routes/forms'))

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`)
})
