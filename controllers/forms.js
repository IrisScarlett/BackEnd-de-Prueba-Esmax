/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */

const { selectPlantas, selectEstanques, selectProductos, selectEmpleados, factor13, volNat, rangoEstanque, updateState, infoPlanta, updateProducto, updateOperacion, selectLibretas, agregarLibretaMedicion, updateEstanque, deleteProductosPlantas, deleteOperacionPlantasQuery, selectEstanque, actualizarLibreta, agregarProducto, updateLibretaModificable, selectNombrePorId, selectNombreProducto, updateTablaCalibracion, selectNombrePlanta, agregarHojaMedida, eliminarProducto, selectRF, selectEmpleadosPorPlanta, selectCalibracion, selectHojasResumen, selectCapacidadRecibir, insertBitacora, updateBitacora, insertBinnacleRegister, agregarRecuentoFisico, selectRecuentos,selectSEC, updateBinnacleRegister, finalizarPausarBitacora, ponerRegistoPausa, selectBitacoras, insertCertificadoBit, selectBitacora, selectRegistros, selectCertificados, insertEntregaTurno, selectHojasBTSEC,searchPendingBinnacle, editReliefAccepted, selectRelaysBinnacle, selectHojasTransSEC  } = require('../database/querys')

const traerPlantas = async (req, res) => {
  try {
    const datos = await selectPlantas()
    res.status(200).json({
      datos,
      msg: 'Solicitudes cargadas con éxito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const traerEstanques = async (req, res) => {
  try {
    const datos = await selectEstanques()
    res.status(200).json({
      datos,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const traerProductos = async (req, res) => {
  try {
    const datos = await selectProductos()
    res.status(200).json({
      datos,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const traerEmpleados = async (req, res) => {
  try {
    const datos = await selectEmpleados()
    res.status(200).json({
      datos,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}
const factor13a = async (req, res) => {
  const { api60 } = req.body
  try {
    const fac13 = await factor13(api60)
    res.status(200).json({
      fac13,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}
const volumen = async (req, res) => {
  const { idPlanta, numeroEstanque, altura } = req.body
  try {
    const volumen = await volNat(numeroEstanque, idPlanta, altura)
    res.status(200).json({
      volumen,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}
const rangeEstanque = async (req, res) => {
  const { idPlanta } = req.body
  try {
    const todos = await rangoEstanque(idPlanta)
    const medio = (Object.entries(todos.reduce((a, { numero_estanque, est_altura }) => (a[numero_estanque] = (a[numero_estanque] || '') + String(est_altura + ' '), a), {}))).map((e) => { const obj = {}; obj[e[0]] = [Math.min(...e[1].trim().split(' ').map((e) => Number(e))), Math.max(...e[1].trim().split(' ').map((e) => Number(e)))]; return obj })

    res.status(200).json({
      medio,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}
const cambiarEstado = async (req, res) => {
  const data = req.body
  data.estado ? data.estado = 1 : data.estado = 0
  await updateState(Object.values(data))
  res.status(200)
}

const agregarLibreta = async (req, res) => {
  const data = req.body
  try {
    const response = await agregarLibretaMedicion(Object.values(data))
    res.status(201).json({
      response,
      msg: 'Agregado Correctamente'
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const addProducts = async (req, res) => {
  try {
    const { producto, planta } = req.body

    const info = await infoPlanta([planta])

    const { productos } = info[0]
    const array = productos.split(',')
    const busqueda = array.find((a) => a === producto)

    if (!busqueda) {
      const nuevoArray = [...array, producto].join(',')

      await updateProducto([nuevoArray, planta])
      res.status(200).json({
        message: 'Actualizado correctamente',
        nuevoProductos: nuevoArray,
        ok: true
      })
    } else {
      return res.status(200).json({
        message: 'Producto ya existe',
        ok: false
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const addOperacion = async (req, res) => {
  try {
    const { operacion, planta } = req.body
    const info = await infoPlanta([planta])
    const { operacion: op } = info[0]
    const array = op.split(',')
    const busqueda = array.find((a) => a === operacion)
    if (!busqueda) {
      const nuevoArray = [...array, operacion].join(',')
      await updateOperacion([nuevoArray, planta])
      return res.status(200).json({
        message: 'Actualizado correctamente',
        nuevasOperaciones: nuevoArray,
        ok: true
      })
    } else {
      return res.status(200).json({
        message: 'Operacion ya existe',
        ok: false
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const traerLibretas = async (req, res) => {
  try {
    const respuesta = await selectLibretas()
    res.status(200).json({
      ok: true,
      msg: 'Lista cargada con exito',
      datos: respuesta
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}

const cambiarEstanque = async (req, res) => {
  try {
    const result = await updateEstanque(Object.values(req.body))
    if (result) {
      res.status(200).json({
        result,
        message: 'Actualizado correctamente',
        ok: true
      })
    } else {
      res.status(200).json({
        message: 'Ha ocurrido un error',
        ok: false
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}
const deleteProductPlants = async (req, res) => {
  try {
    const { planta_id, producto } = req.params
    const info = await infoPlanta([planta_id])
    const { productos } = info[0]
    const nuevoArray = productos.split(',').filter((p) => p != producto).join(',')
    await deleteProductosPlantas([nuevoArray, planta_id])
    res.status(200).json({
      volumen,
      msg: 'Producto eliminado con exito',
      ok: true
    })
  } catch {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}
const deleteOperacionPlantas = async (req, res) => {
  try {
    const { planta_id, operacion } = req.params
    const info = await infoPlanta([planta_id])
    const { operacion: operaciones } = info[0]
    const nuevoArray = operaciones.split(',').filter((o) => o != operacion).join(',')
    await deleteOperacionPlantasQuery([nuevoArray, planta_id])
    res.status(200).json({
      volumen,
      msg: 'Operacion eliminada con exito',
      ok: true
    })
  } catch {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}

const infoEstanque = async (req, res) => {
  try {
    const datos = await selectEstanque(Object.values(req.params))
    res.status(200).json({
      datos,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const modificarLibreta = async (req, res) => {
  try {
    const resp = await actualizarLibreta(Object.values(req.body))

    res.status(200).json({
      resp,
      msg: 'Libreta modificada con éxito',
      ok: true
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}

const actualizarModificacionLibreta = async (req, res) => {
  try {
    await updateLibretaModificable(Object.values(req.body))
    res.status(200).json({
      volumen,
      msg: 'Libreta actualizada con éxito',
      ok: true
    })
  } catch (error) {
    res.status(200).json({
      volumen,
      msg: 'Ha ocurrido un error, intente nuevamente',
      ok: false
    })
  }
}

const insertProducto = async (req, res) => {
  const data = req.body
  try {
    const response = await agregarProducto(Object.values(data))
    res.status(201).json({
      response,
      msg: 'Producto agregado correctamente'
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const buscarNombrePorId = async (req, res) => {
  try {
    const nombre = await selectNombrePorId(Object.values(req.body))
    if (nombre.length > 0) {
      return res.status(200).json({
        ok: true,
        nombre
      })
    } else {
      return res.status(200).json({
        ok: false
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const mostrarNombreProducto = async (req, res) => {
  try {
    const nombreProducto = await selectNombreProducto(Object.values(req.params))
    res.status(200).json({
      nombreProducto,
      msg: 'Nombre del producto mostrado con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const seleccionarNombrePlanta = async (req, res) => {
  const data = req.params
  try {
    const resp = await selectNombrePlanta(Object.values(data))
    res.status(200).json({
      resp,
      msg: 'Nombre cargado con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const actualizarCalibracionesEstanque = async (req, res) => {
  const { plantaCalibrar, estanqueCalibrar, newCalibration } = req.body
  try {
    // siesque viene alguna letra arrojar error
    const verificacionLetras = newCalibration.find(c => c.find(i => (isNaN(i))))
    if (verificacionLetras) {
      return res.status(200).json({
        ok: false,
        msg: 'Archivo no puede contener letras, excepto cabecera, ni "," para decimales'
      })
    }
    // verificar si en calibraciones viene algun idplanta o numestanque erroneo
    const verificacionPlantas = newCalibration.find(c => (c[2] != estanqueCalibrar || c[3] != plantaCalibrar))
    if (verificacionPlantas) {
      return res.status(200).json({
        ok: false,
        msg: 'Esta intentando cargar numero estanque o id planta donde no corresponde'
      })
    }

    if (newCalibration.find(c => c.length <= 4 && c)) {
      // filtrando posibles filas con array completamente vacios
      const calibracionesSinArrayVacio = newCalibration.filter(n => (n[0] !== '' && n[1] !== '' && n[2] !== '' && n[3] !== ''))
      const resp = await updateTablaCalibracion([plantaCalibrar, estanqueCalibrar], calibracionesSinArrayVacio)
      res.status(200).json({
        resp,
        ok: true,
        msg: 'cargado con exito'
      })
    } else {
      res.status(200).json({
        ok: false,
        msg: 'Formato de CSV inválido, debe tener 4 columnas'
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, intente nuevamente'
    })
  }
}

const deleteProducto = async (req, res) => {
  const codigo = req.params

  try {
    const response = await eliminarProducto(Object.values(codigo))
    res.status(201).json({
      response,
      msg: 'Producto eliminado correctamente'
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const insertHojaMedida = async (req, res) => {
  const data = req.body
  try {
    const response = await agregarHojaMedida(Object.values(data))
    res.status(201).json({
      response,
      msg: 'Hoja de medida agregada correctamente'
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const generarPDF = async (req, res) => {
  const response = generadorPDF()
  res.status(200).json({
    response,
    bla: 'bla',
    ok: true
  })
}

const datosRecuentoFisico = async (req, res) => {
  try {
    const respuesta = await selectRF(Object.values(req.params))
    if (respuesta.length == 0) {
      return res.status(200).json({
        ok: false,
        msg: 'No existe recuento físico para la fecha seleccionada'
      })
    }
    res.status(200).json({
      ok: true,
      msg: 'Datos cargadoscon exito',
      datos: respuesta
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}

const buscarOperadoresPorPlanta = async (req, res) => {
  try {
    const response = await selectEmpleadosPorPlanta(Object.values(req.params))
    res.status(200).json({
      response,
      ok: true,
      msg: 'Usuarios cargados con éxito'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}

const capacidadRecibir = async (req, res) => {
  try {
    const response = await selectCapacidadRecibir(Object.values(req.params))
    if (response.length > 0) {
      res.status(200).json({
        response: response[0],
        ok: true,
        msg: 'Datos cargados con exito'
      })
    } else {
      res.status(200).json({
        ok: false,
        msg: 'Aun no hay registros'
      })
    }
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    }
    )
  }
}
const traerCalibracion = async (req, res) => {
  try {
    const datos = await selectCalibracion(Object.values(req.params))
    res.status(200).json({
      datos,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}
const modalHojasResumen = async (req, res) => {
  try {
    const datos = await selectHojasResumen()
    res.status(200).json({
      datos,
      msg: 'Solicitudes cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const traerLibretasSEC = async (req, res) => {
  try {
    const datos = await selectSEC(Object.values(req.params))
    res.status(200).json({
      datos,
      msg: 'Libretas cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const nuevaBitacora = async (req, res) => {
  try {
    req.body.capacidad = (req.body.capacidad).toFixed(2)
    const response = await insertBitacora(Object.values(req.body))
    const { folio_bitacora } = response[0]
    res.status(200).json({
      folio_bitacora,
      ok: true,
      msg: 'Bitacora guardada con exito'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}
const modificarHeaderBitacora = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await updateBitacora(Object.values(req.body))
    res.status(200).json({
      ok: true,
      msg: 'Bitacora actualizada con exito'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}
const nuevoRegBitacora = async (req, res) => {
  try {
    const response = await insertBinnacleRegister(Object.values(req.body))
    const { id_registrobitacora } = response[0]
    res.status(200).json({
      id_registrobitacora,
      ok: true,
      msg: 'Ha ocurrido un error'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}
const insertRecuentoFisico = async (req, res) => {
  const data = req.body

  try {
    const response = await agregarRecuentoFisico(Object.values(data))

    res.status(201).json({
      response,
      ok: true,
      msg: 'Recuento Fisico agregado correctamente'
    })
  } catch (error) {
    res.status(200).json({
      msg: 'Ha ocurrido un error',
      ok: false
    })
  }
}
const traerRecuentosPorFecha = async (req, res) => {
  try {
    const response = await selectRecuentos(Object.values(req.params))
    res.status(200).json({
      response,
      ok: true,
      msg: 'Recuentos cargados con exito'
    })
  } catch (error) {
    res.status(200).json({
      response,
      ok: false,
      msg: error.message
    })
  }
}

const updateRegBitacora=async(req,res) => {
  try {
    await updateBinnacleRegister(Object.values(req.body))
    res.status(200).json({
      ok: true,
      msg: 'Modificado con éxito'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Ha ocurrido un error'
    })
  }
}

const finalizarPausarBit =async (req,res) => {
  try {
    const response= await finalizarPausarBitacora(Object.values(req.body))
   if(req.body.finalizada){
     return res.status(200).json({
      ok: true,
      msg: 'Bitacora finalizada con éxito'
    })
   }else{
    return res.status(200).json({
      ok: true,
      msg: 'Bitacora pausada con éxito'
    })
   }
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: error.message
    })
  }
}
const registroPausa= async (req,res) => {
  try {
    await ponerRegistoPausa(Object.values(req.body))
    res.status(200).json({
      ok: true,
      msg: 'Bitacora pausada con éxito'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: error.message
    })
  }
}

const traerBitacoras=async (req,res) => {
  try {
    const bitacoras=await selectBitacoras(Object.values(req.params))
    res.status(200).json({
      bitacoras,
      ok: true,
      msg: 'Bitacoras cargadas con exito'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: error.message
    })
  }
}
const nuevoCertificado=async(req,res) => {
  req.body.api=req?.body?.api?.replace(',','.')
  try {
    const response= await insertCertificadoBit(Object.values(req.body))
    res.status(200).json({
      ok:true,
      msg:'Certificado agregado con exito'
    })
  } catch (error) {
    res.status(200).json({
      ok:false,
      msg:error.message
    })
  }
}
const traerBitacora=async (req,res) => {
  try {
   response= await selectBitacora(Object.values(req.params))
   res.status(200).json({
     response,
    ok:true,
    msg:'Bitacora exito'
  })
  } catch (error) {
    res.status(200).json({
      ok:false,
      msg:error.message
    })
  }
}

// Exportaciones
const traerRegistros= async(req,res) => {
  try {
    response= await selectRegistros(Object.values(req.params))
    res.status(200).json({
    response,
     ok:true,
     msg:'Registros cargados con exito'
   })
   } catch (error) {
     res.status(200).json({
       ok:false,
       msg:error.message
     })
   }
}
const traerCertificados= async(req,res) => {
  try {
    response= await selectCertificados(Object.values(req.params))
    res.status(200).json({
    response,
     ok:true,
     msg:'Certificados cargados con exito'
   })
   } catch (error) {
     res.status(200).json({
       ok:false,
       msg:error.message
     })
   }
}

const traerHojasBTSEC = async (req, res) => {
  try {
    const datos = await selectHojasBTSEC(Object.values(req.params))
    res.status(200).json({
      datos,
      msg: 'Hojas de medida cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}

const entregaTurnoBitacora=async(req,res) => {
  try {
    const response=await insertEntregaTurno(Object.values(req.body))
    res.status(200).json({
      ok:true,
      msg:'Turno entregado'
    })
  } catch (error) {
    res.status(200).json({
      ok:false,
      msg:error.message
    })
  }
}
const consultaBitacoraPendiente=async (req,res) => {
  try {
    const response=await searchPendingBinnacle(Object.values(req.params))
    if (response.length>0) {
      return res.status(200).json({
        response: response[0],
        ok:true,
        msg:'Tiene un relevo de bitácora'
      })
    }else{
      return res.status(200).json({
        ok:true,
        msg:'No tiene relevos pendientes'
      })
    }
  } catch (error) {
    return res.status(200).json({
      ok:false,
      msg:error.message
    })
  }
}
const acceptRelief=async (req,res) => {
  try {
    const response=await editReliefAccepted(Object.values(req.body))
    res.status(200).json({
      ok:true,
      msg:'Cambiado con exito'
    })
  } catch (error) {
    res.status(200).json({
      ok:false,
      msg:'Ha ocurrido un error'
    })
  }
}

const searchRelaysByBinaccle=async (req,res) => {
  try {
    const response=await selectRelaysBinnacle(Object.values(req.params))
    res.status(200).json({
      response,
      ok:true,
      msg:'Cargados con exito'
    })
  } catch (error) {
    res.status(200).json({
      ok:false,
      msg:'Ha ocurrido un error'
    })
  }
}

const traerHojasTransSEC = async (req, res) => {
  try {
    const datos = await selectHojasTransSEC(Object.values(req.params))
    res.status(200).json({
      datos,
      msg: 'Hojas de medida cargadas con exito',
      ok: true
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      ok: false
    })
  }
}
module.exports = {
  modificarLibreta,
  traerPlantas,
  traerProductos,
  traerEmpleados,
  traerEstanques,
  factor13a,
  volumen,
  rangeEstanque,
  cambiarEstado,
  agregarLibreta,
  addProducts,
  addOperacion,
  traerLibretas,
  cambiarEstanque,
  deleteProductPlants,
  deleteOperacionPlantas,
  infoEstanque,
  insertProducto,
  actualizarModificacionLibreta,
  buscarNombrePorId,
  mostrarNombreProducto,
  deleteProducto,
  actualizarCalibracionesEstanque,
  seleccionarNombrePlanta,
  insertHojaMedida,
  generarPDF,
  datosRecuentoFisico,
  buscarOperadoresPorPlanta,
  capacidadRecibir,
  traerCalibracion,
  modalHojasResumen,
  traerLibretasSEC,
  insertRecuentoFisico,
  nuevaBitacora,
  modificarHeaderBitacora,
  nuevoRegBitacora,
  traerRecuentosPorFecha,
  updateRegBitacora,
  finalizarPausarBit,
  registroPausa,
  traerBitacoras,
  nuevoCertificado,
  traerBitacora,
  traerRegistros,
  traerCertificados,
  traerHojasBTSEC,
  entregaTurnoBitacora,
  entregaTurnoBitacora,
  consultaBitacoraPendiente,
  acceptRelief,
  searchRelaysByBinaccle,
  traerHojasTransSEC
}
