const { Router } = require('express')
const { traerPlantas, traerEstanques, traerProductos, traerEmpleados, factor13a, volumen, rangeEstanque, cambiarEstado, agregarLibreta, addProducts, addOperacion, traerLibretas, cambiarEstanque, deleteProductPlants, deleteOperacionPlantas, infoEstanque, modificarLibreta, insertProducto, actualizarModificacionLibreta, buscarNombrePorId, mostrarNombreProducto, deleteProducto, actualizarCalibracionesEstanque, seleccionarNombrePlanta, insertHojaMedida, datosRecuentoFisico, buscarOperadoresPorPlanta, capacidadRecibir, nuevaBitacora, modificarHeaderBitacora, nuevoRegBitacora, traerCalibracion, modalHojasResumen, insertRecuentoFisico, traerLibretasSEC, traerRecuentosPorFecha ,updateRegBitacora, finalizarPausarBit, registroPausa, traerBitacoras, nuevoCertificado, traerBitacora, traerRegistros, traerCertificados, entregaTurnoBitacora, traerHojasBTSEC,consultaBitacoraPendiente, acceptRelief, searchRelaysByBinaccle, traerHojasTransSEC } = require('../controllers/forms')
const router = Router()

// BASE /api/forms/

// example
router.get('/plantas', traerPlantas)
router.get('/estanques', traerEstanques)
router.get('/productos', traerProductos)
router.get('/empleados', traerEmpleados)
router.post('/factor13', factor13a)
router.post('/volumen', volumen)
router.post('/calibracion', rangeEstanque)
router.post('/agregarlibreta', agregarLibreta)
router.put('/modificarlibreta', modificarLibreta)
router.put('/addProducto', addProducts)
router.put('/addOperacion', addOperacion)
router.post('/cambiarestanque', cambiarEstanque)
router.delete('/deleteProductPlants:producto&:planta_id', deleteProductPlants)
router.delete('/deleteOperacionPlantas:operacion&:planta_id', deleteOperacionPlantas)
router.get('/infoEstanque:idPlanta&:idEstanque', infoEstanque)
router.get('/libretas', traerLibretas)
router.post('/insertProducto', insertProducto)
router.put('/updateModificarLibreta', actualizarModificacionLibreta)
router.post('/buscarNombrePorId', buscarNombrePorId)
router.get('/mostrarNombreProductos:idPlanta&:idEstanque', mostrarNombreProducto)
router.delete('/deleteProducto:codigo_producto', deleteProducto)
router.get('/nombrePlantaporId:id', seleccionarNombrePlanta)
router.post('/archivocalibraciones', actualizarCalibracionesEstanque)
router.post('/insertHojaMedida', insertHojaMedida)
router.get('/operadoresPlanta:idPlanta', buscarOperadoresPorPlanta)
router.get('/capacidadRecibir:idPlanta&:idEstanque&:altura', capacidadRecibir)
router.get('/infoCalibracion:idPlanta&:idEstanque&:alturaInt', traerCalibracion)
router.get('/modalHojasResumen', modalHojasResumen)
router.get('/traerLibretasSEC:idPlanta&:idEstanque&:mesLibreta&:anioLibreta', traerLibretasSEC)
router.get('/traerHojasBTSEC:idPlanta&:idEstanque&:mesHoja&:anioHoja', traerHojasBTSEC)
router.get('/traerHojasTransSEC:idPlanta&:idEstanque&:mesHoja&:anioHoja', traerHojasTransSEC)

// endpoint bitacora
router.get('/bitacoras:plantaid', traerBitacoras)
router.post('/bitacora', nuevaBitacora)
router.put('/bitacora', modificarHeaderBitacora)
router.get('/bitacora:folio', traerBitacora)
router.put('/finalizarbitacora', finalizarPausarBit)
// endpoint registro bitacora
router.post('/regbitacora', nuevoRegBitacora)
router.put('/regbitacora', updateRegBitacora)
router.post('/regbitacorapausa', registroPausa)
router.get('/registros:folioBitacora', traerRegistros)

// certificadosbitacora
router.post('/certBitacora', nuevoCertificado)
router.get('/certificados:folioBitacora', traerCertificados)
// entregaturnobit
router.post('/entregaTurno', entregaTurnoBitacora)


router.post('/insertRecuentoFisico', insertRecuentoFisico)
router.get('/datosRecuentoFisico:idPlanta&:idEstanque', datosRecuentoFisico)
router.get('/recuentosPorFecha:fecha', traerRecuentosPorFecha)
// ruta estado empleados
router.put('/estadoEmpleado', cambiarEstado)
// ruta buscar si tiene bitacora a recepcionar
router.get('/consultaBitacoraPendiente:idUsr',consultaBitacoraPendiente)
router.put('/reliefAccepted', acceptRelief)
router.get('/searchRelays:folio',searchRelaysByBinaccle)

module.exports = router
