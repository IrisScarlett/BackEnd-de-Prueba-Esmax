const res = require('express/lib/response')
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DDBBUSER,
  host: process.env.HOST,
  password: process.env.DDBBPASS,
  database: process.env.DDBBNAME,
  port: process.env.DDBBPORT
})
const selectPlantas = async () => {
  const query = 'select * from planta order by propiedad desc '
  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectEstanques = async () => {
  const query = 'select * from estanques e inner join productos p on e.codigo_producto=p.codigo_producto order by e.numero_estanque'
  // let statusError
  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectProductos = async () => {
  const query = 'select * from productos'

  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectEmpleados = async () => {
  const query = 'select usuario_id , pla_glosa , usr_nombre , usr_correo , usr_username , usr_estado_id from empleados inner join planta on empleados.usr_planta_id = planta.planta_id order by usr_nombre'
  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const factor13 = async (input) => {
  const query = `select Factor13 from factor13 where API60 = ${input}`

  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const volNat = async (numeroEstanque, idPlanta, altura) => {
  const query = `select est_volumen from calibracion where numero_estanque = ${numeroEstanque} and planta_id=${idPlanta} and est_altura=${altura}`
  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}
const rangoEstanque = async (idPlanta) => {
  const query = `select est_altura, numero_estanque from calibracion where planta_id=${idPlanta}`
  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const updateState = async (array) => {
  const query = `UPDATE empleados
SET usr_estado_id = $2 
WHERE usuario_id = $1;`
  try {
    const res = await pool.query(query, array)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const agregarLibretaMedicion = async (datos) => {
  const query = 'insert into medicion(planta_id, numero_estanque, oleoducto, transferencia, trasvasijo, r_fisico, drenaje, sec, alarma_nivel, altura_ref, fecha, hora, altura_externa, altura_interna_primera, altura_interna_segunda, altura_interna_tercera, altura_interna, altura_agua, temperatura_interna_inferior, temperatura_interna_medio, temperatura_interna_superior, temperatura_interna_promedio, densidad_laboratorio, temperatura_laboratorio, api60, primera_medicion, segunda_medicion, tercera_medicion, cuarta_medicion, quinta_medicion,sexta_medicion, usuario_id, usuario_edit,bloqueado) values($31, $32, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, null,true) RETURNING folio_id'
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const infoPlanta = async (id) => {
  const query = 'select * from planta where planta_id = $1'
  try {
    const res = await pool.query(query, id)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const updateProducto = async (datos) => {
  const query = 'update planta set productos = $1 where planta_id = $2'
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}
const updateOperacion = async (datos) => {
  const query = 'update planta set operacion = $1 where planta_id = $2'
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const updateEstanque = async (datos) => {
  const query = 'update estanques set fecha_expiracion = $1, codigo_producto = $2, volumen_manifold_estanque= $3, volumen_estanque_motobomba = $4,volumen_motobomba_mesallenado=$5, volumen_total_linea = $6 where codigo_estanque = $8 and planta_id = $7 returning *'
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const deleteProductosPlantas = async (datos) => {
  const query = ('update planta set productos = $1 where planta_id =$2')
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const deleteOperacionPlantasQuery = async (datos) => {
  const query = ('update planta set operacion = $1 where planta_id =$2')
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectEstanque = async (datos) => {
  const query = 'select * from estanques where planta_id = $1 and numero_estanque = $2'
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}
const selectLibretas = async () => {
  const query = 'select * from medicion order by (fecha,hora) desc'

  try {
    const res = await pool.query(query)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const actualizarLibreta = async (datos) => {
  const query = `UPDATE medicion
    SET oleoducto=$2, transferencia=$3, trasvasijo=$4, r_fisico=$5, drenaje=$6, sec=$7, alarma_nivel=$8, altura_ref=$9, fecha=$10, hora=$11, altura_externa=$12, altura_interna_primera=$13, altura_interna_segunda=$14, altura_interna_tercera=$15, altura_interna=$16, altura_agua=$17, temperatura_interna_inferior=$18, temperatura_interna_medio=$19, temperatura_interna_superior=$20, temperatura_interna_promedio=$21, densidad_laboratorio=$22, temperatura_laboratorio=$23, api60=$24, primera_medicion=$25, segunda_medicion=$26, tercera_medicion=$27, cuarta_medicion=$28, quinta_medicion=$29, sexta_medicion=$30, usuario_edit=$31 where folio_id = $1;
    `
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const buscarUserPorUsername = async (usrname) => {
  const query = 'select * from empleados where usr_username = $1'
  try {
    const resp = await pool.query(query, usrname)
    return resp.rows
  } catch (error) {
    console.log(error)
    throw new Error('Ha ocurrido un error')
  }
}

const agregarProducto = async (datos) => {
  const query = 'INSERT INTO productos(codigo_producto, nombre_producto) VALUES ($1, $2) RETURNING *'
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const updateLibretaModificable = async (datos) => {
  const query = `UPDATE medicion
  SET bloqueado=$1 where folio_id = $2 ;
  `
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectNombrePorId = async (id) => {
  const query = 'select usr_nombre from empleados where usuario_id = $1 '
  try {
    const res = await pool.query(query, id)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectNombreProducto = async (datos) => {
  const query = `select nombre_producto, color_producto  from planta as p
  inner join estanques as e on e.planta_id = p.planta_id 
  inner join productos as pr on pr.codigo_producto = e.codigo_producto
  where p.planta_id = $1 and e.numero_estanque = $2`
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const eliminarProducto = async (codigo) => {
  const query = 'delete from productos where codigo_producto = $1 returning *'
  try {
    const res = await pool.query(query, codigo)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectNombrePlanta = async (id) => {
  const query = 'select pla_glosa from planta where planta_id = $1'
  try {
    const res = await pool.query(query, id)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un problema')
  }
}

const updateTablaCalibracion = async (datos, calibraciones) => {
  try {
    const queryEliminacion = `
    delete from calibracion where numero_estanque = $2 and planta_id = $1 returning *;
    `
    const insertarRegistros = `INSERT INTO calibracion
    (est_altura, est_volumen, numero_estanque, planta_id)
    VALUES($1, $2, $3, $4);
    `
    // await pool.query('BEGIN TRANSACTION')
    const res = await pool.query(queryEliminacion, datos)
    calibraciones.map(async c => {
      if (c.length === 1) {
        const regex = /['"]/gm
        const datosfix = c[0].replace(regex, '').split(',')
        // console.log('lo segundo es',datosfix)
        await pool.query(insertarRegistros, datosfix)
      } else {
        await pool.query(insertarRegistros, c)
      }
    })
    // await pool.query('COMMIT')
    return res.rows
  } catch (error) {
    // await client.query('ROLLBACK')
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}

const agregarHojaMedida = async (datos) => {
  const query = `
  INSERT INTO hojamedida (fecha, estanque, operaciones, nombre_producto, transaccion, ciclo, emb, factor13_check, medidor_natural_check, medidor_a60_check, folio_libreta_antes, fecha_antes, hora_antes, altura_estanque_antes, altura_agua_antes, temperatura_laboratorio_antes, densidad_laboratorio_antes, volumen_natural_antes, volumen_natural_antes_suma, desplazamiento_techo_antes, manifold_estanque_antes, estanque_motobomba_antes, motobomba_mesallenado_antes, volumen_agua_antes, api60_antes, factor6_antes, factor13_antes, kilos_antes, folio_libreta_despues, fecha_despues, hora_despues, altura_estanque_despues, altura_agua_despues, temperatura_laboratorio_despues, densidad_laboratorio_despues, volumen_natural_despues, volumen_natural_despues_suma, desplazamiento_techo_despues, manifold_estanque_despues, estanque_motobomba_despues, motobomba_mesallenado_despues, volumen_agua_despues, api60_despues, factor6_despues, factor13_despues, kilos_despues, suma_total_medidores, gran_total_natural, gran_total_a60, gran_total_kilos, first_medidores_antes, second_medidores_antes, third_medidores_antes, fourth_medidores_antes, fifth_medidores_antes, six_medidores_antes, first_medidores_despues, second_medidores_despues, third_medidores_despues, fourth_medidores_despues, fifth_medidores_despues, six_medidores_despues, primer_medidor_final, segundo_medidor_final, tercer_medidor_final, cuarto_medidor_final, quinto_medidor_final, sexto_medidor_final, observaciones, distribucion_esmax_a60, distribucion_enax_a60, distribucion_copec_a60, distribucion_otros_a60, nombre_usuario, codigo_usuario, planta_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76) RETURNING folio
`
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectRF = async (datos) => {
  const query = `select medicion.planta_id, 
  folio_id,
  medicion.numero_estanque,
  r_fisico, 
  fecha,
  hora,
  altura_externa,
  altura_interna,
  altura_agua,
  temperatura_interna_promedio,
  densidad_laboratorio,
  temperatura_laboratorio,
  medicion.api60,
  primera_medicion,segunda_medicion,tercera_medicion,cuarta_medicion,quinta_medicion,sexta_medicion,
  usr_nombre,
  factor13,codigo_producto, 
  volumen_total_linea 
  from medicion 
  inner join empleados on medicion.usuario_id = empleados.usuario_id
  inner join factor13 on medicion.api60 = factor13.api60
  inner join estanques on medicion.planta_id = estanques.planta_id and medicion.numero_estanque = estanques.numero_estanque
  where r_fisico = true and medicion.planta_id = $1 and medicion.numero_estanque = $2`
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un problema')
  }
}

const selectEmpleadosPorPlanta = async (datos) => {
  const query = 'select usuario_id,usr_nombre from empleados where usr_planta_id = $1'
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}

const selectCapacidadRecibir = async (datos) => {
  const query = `select est_volumen , capacidad_llenado_seguro from calibracion c 
  inner join estanques e 
  on e.planta_id = c.planta_id 
  and e.numero_estanque = c.numero_estanque 
  where c.est_altura=$3 and c.numero_estanque = $2 and c.planta_id= $1`
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}
const selectCalibracion = async (datos) => {
  const query = 'select * from calibracion where planta_id=$1 and numero_estanque = $2 and est_altura = $3 '

  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectHojasResumen = async () => {
  const query = `select fecha from medicion 
  where r_fisico = true 
  group by fecha 
  order by fecha desc`

  try {
    const res = await pool.query(query)
    // console.log(res)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const selectSEC = async (datos) => {
  const query = `select * from (select folio_id, r_fisico, planta_id, numero_estanque, fecha, extract(day from fecha) as dias, hora, altura_interna, temperatura_interna_promedio, densidad_laboratorio, temperatura_laboratorio, api60, primera_medicion, segunda_medicion, tercera_medicion, cuarta_medicion, quinta_medicion, sexta_medicion from medicion where r_fisico = true AND extract(month from fecha) = $3 AND EXTRACT(YEAR FROM fecha) = $4 AND planta_id = $1 AND numero_estanque = $2) m 
  right join dias
  ON dias.dias = m.dias
  ORDER BY dias.dias ASC ;
  `
  
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}
const insertBitacora = async (datos) => {
  const query = `INSERT INTO public.bitacora
  (fecha_bitacora, operador_bitacora, estanque_bitacora, operando, enfalla, mantencion, altint_bitacora, cantrecibir_bitacora, capacidad, prod_linea, obs_bitacora, id_planta)
  VALUES($1, $9, $10, $2, $3, $4, $5, $6, $7, $11, $8,$12) returning folio_bitacora;
  `
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}
const updateBitacora = async (datos) => {
  const query = `UPDATE public.bitacora
  SET  operando=$1, enfalla=$2, mantencion=$3, obs_bitacora=$4, cantrecibir_bitacora=$6
  WHERE folio_bitacora= $5;
  `
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}
const insertBinnacleRegister = async (datos) => { 
  const datosArr= datos.map(d=>d===''?null:d)
  const query = `INSERT INTO public.registro_bitacora
  ("fecha_regBit", altura_regbit, api_regbit, temp_regbit, api60_regbit, api60cert_regbit, dif_apis_regbit, certificado_regbit, vol_desp_regbit, vol_ent_regbit, vol_rec_regbit, flash_regbit, obs_regbit, folio_bitacora, errorDifApis, registropausa)
  VALUES($1, $2, $3, $4, $13, $5, $6, $7, $8, $9, $10, $11, $12, $14, $15, false) returning id_registrobitacora;
  `
  try {
    const resp = await pool.query(query, datosArr)
    return resp.rows
  } catch (error) {
    console.log(error)
    throw new Error('Ha ocurrido un error')
  }
}
const agregarRecuentoFisico = async (datos) => {
  const query = `
  INSERT INTO recuentofisico (
    planta_id, numero_estanque, nombre_producto, usuario_logeado, oleoducto_rf, trasvasijo_rf, drenaje_rf, sec_rf, transferencia_rf, alarma_nivel_rf, hora_rf, altura_externa_rf, altura_interna_rf, nivel_agua_rf, densidad_observada_rf, temperatura_observada_rf, temperatura_inferiror_rf, temperatura_rf, factor_pared_rf, api60_rf, factor6_rf, factor13_rf, primera_medicion_rf, segunda_medicion_rf, tercera_medicion_rf, cuerta_medicion_rf, quinta_medicion_rf, sexta_medicion_rf, primer_cierre_rf, segundo_cierre_rf, tercer_cierre_rf, cuarto_cierre_rf, quinto_cierre_rf, sexto_cierre_rf, volumen_canerias_rf, volumen_medidores_rf, volumen_estanque_rf, volumen_agua_rf, volumen_otros_rf, volumen_natural_rf, volumen_60f_rf, volumen_kilos_rf, observaciones, fecha_rf)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44);
`
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
    throw new Error('Ha ocurrido un error')
  }
}

const selectRecuentos = async (datos) => {
  const query = 'select * from recuentofisico where fecha_rf=$1'

  try {
    const resp = await pool.query(query, datos)
    return resp.rows
  } catch (error) {
    console.log(error)
    throw new Error('Ha ocurrido un error')
  }
}
const updateBinnacleRegister=async (datos) => {
  const datosArr= datos.map(d=>d===''?null:d)
  const query= `UPDATE public.registro_bitacora
  SET "fecha_regBit"=$1, altura_regbit=$2, api_regbit=$3, temp_regbit=$4, api60_regbit=$13, api60cert_regbit=$5, dif_apis_regbit=$6, certificado_regbit=$7, vol_desp_regbit=$8, vol_ent_regbit=$9, vol_rec_regbit=$10, flash_regbit=$11, obs_regbit=$12, errorDifApis=$15
  WHERE id_registrobitacora=$14;
  `
  try {
    const resp= await pool.query(query,datosArr)
    return resp.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')

  }
}

const finalizarPausarBitacora=async (datos) => {
  const query=`UPDATE public.bitacora
  SET finalizada=$1
  WHERE folio_bitacora=$2
  `
  try {
    const res= await pool.query(query,datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error, intente denuevo')
  }
}
const ponerRegistoPausa= async (data) => {
  const datosArr= data.map(d=>d===''?null:d)
  const query = `INSERT INTO public.registro_bitacora
  ("fecha_regBit", altura_regbit, api_regbit, temp_regbit, api60_regbit, api60cert_regbit, dif_apis_regbit, certificado_regbit, vol_desp_regbit, vol_ent_regbit, vol_rec_regbit, flash_regbit, obs_regbit, folio_bitacora, errorDifApis, registropausa)
  VALUES($1, $2, $3, $4, $13, $5, $6, $7, $8, $9, $10, $11, $12, $14, $15, true) returning id_registrobitacora;
  `
  try {
    const resp=await pool.query(query,datosArr)
    return resp.rows
  } catch (error) {
    console.log(error.message)
    throw new Error ('Ha ocurrido un error')
  }
}
const selectBitacoras= async (plantaid) => {
  const query = `select p2.nombre_producto ,b.estanque_bitacora, p.pla_glosa,b.finalizada ,b.fecha_bitacora ,b.folio_bitacora from bitacora b inner join planta p 
  on b.id_planta = p.planta_id 
  inner join productos p2 
  on b.prod_linea = p2.codigo_producto 
  where b.id_planta = $1
  order by b.fecha_bitacora desc`
  try {
    const resp= await pool.query(query,plantaid)
    return resp.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}

const insertCertificadoBit=async(datos) => {
  const query=`INSERT INTO public.certbitacoras
  (numero_certificado, api, id_bitacora)
  VALUES($1, $2, $3);
  `
  try {
    const res= await pool.query(query,datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}
//
const selectBitacora=async(folio) => {
  const query=`select * from bitacora b
  inner join productos p 
  on p.codigo_producto = b.prod_linea   
  inner join empleados e
  on e.usuario_id = b.operador_bitacora 
  where b.folio_bitacora = $1
  `
  try {
    const res= await pool.query(query,folio)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}
const selectRegistros=async (folio) => {
  const query=`select * from registro_bitacora r
  where r.folio_bitacora  = $1 order by r."fecha_regBit"  asc
  `
  try {
    const res= await pool.query(query,folio)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}
const selectCertificados=async (folio) => {
  const query=`select * from certbitacoras c
  where c.id_bitacora  = $1
  `
  try {
    const res= await pool.query(query,folio)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}

const selectHojasBTSEC = async (datos) => {
  const query = `select * from (select fecha, extract(day from fecha) as dias, estanque, operaciones, gran_total_a60 as gto, planta_id from hojamedida where operaciones = 'BT/Oleoducto' AND extract(month from fecha) = $3 AND EXTRACT(YEAR FROM fecha) = $4 AND planta_id = $1 AND estanque = $2) o 
  right join dias
  ON dias.dias = o.dias
  ORDER BY dias.dias ASC
  `
  
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

const insertEntregaTurno=async (datos) => {
  const query=`INSERT INTO public.datos_entrega_bitacora
  (fecha, hora, op_entrega, op_recibe, prod_recepcion, tiempo_remate, prod_faltantes, est_valvulas, est_prod, id_bitacora,relevo_aceptado)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,false);
  `
  try {
    const res= await pool.query(query,datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}
const searchPendingBinnacle= async (id) => {
  const query=`select e.usr_nombre, id_entrega, fecha, hora, op_entrega, op_recibe, prod_recepcion, tiempo_remate, prod_faltantes, est_valvulas, est_prod, id_bitacora,relevo_aceptado from datos_entrega_bitacora d
  inner join empleados e
  on d.op_entrega = e.usr_codigo 
  where  op_recibe=$1 and relevo_aceptado=false;
  `
  try {
    const resp= await pool.query(query,id)
    return resp.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}

const editReliefAccepted= async (datos) => {
  const query=`UPDATE public.datos_entrega_bitacora
  SET relevo_aceptado= $1
  WHERE id_entrega=$2;
  `
  try {
    const resp= await pool.query(query,datos)
    return resp.rows
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}

const selectRelaysBinnacle=async (id) => {
  const query=`select hora,d.op_recibe, usr_nombre  from datos_entrega_bitacora  d
  inner join empleados e 
  on e.usr_codigo = d.op_recibe 
  where d.relevo_aceptado=true and d.id_bitacora = $1
  `
  try {
    const resp= await pool.query(query,id)
    return resp.rows
    
  } catch (error) {
    console.log(error.message)
    throw new Error('Ha ocurrido un error')
  }
}

const selectHojasTransSEC = async (datos) => {
  const query = `select * from (select fecha, extract(day from fecha) as dias, estanque, gran_total_a60 as gtt, planta_id from hojamedida where operaciones = 'Transferencia' and extract(month from fecha) = 03 AND EXTRACT(YEAR FROM fecha) = 2022 AND planta_id = 5 AND estanque = 6006) t 
  right join dias
  ON dias.dias = t.dias 
  ORDER BY dias.dias ASC
  `
  
  try {
    const res = await pool.query(query, datos)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  updateLibretaModificable,
  buscarUserPorUsername,
  actualizarLibreta,
  selectEstanques,
  selectProductos,
  selectEmpleados,
  factor13,
  volNat,
  rangoEstanque,
  updateState,
  infoPlanta,
  updateProducto,
  updateOperacion,
  agregarLibretaMedicion,
  selectLibretas,
  updateEstanque,
  deleteProductosPlantas,
  deleteOperacionPlantasQuery,
  selectEstanque,
  selectPlantas,
  agregarProducto,
  selectNombrePorId,
  selectNombreProducto,
  eliminarProducto,
  updateTablaCalibracion,
  selectNombrePlanta,
  agregarHojaMedida,
  selectRF,
  selectEmpleadosPorPlanta,
  selectCapacidadRecibir,
  selectCalibracion,
  selectHojasResumen,
  selectSEC,
  insertBitacora,
  updateBitacora,
  insertBinnacleRegister,
  agregarRecuentoFisico,
  selectRecuentos,
  updateBinnacleRegister,
  finalizarPausarBitacora,
  ponerRegistoPausa,
  selectBitacoras,
  insertCertificadoBit,
  selectBitacora,
  selectRegistros,
  selectCertificados,
  selectHojasBTSEC,
  insertEntregaTurno,
  insertEntregaTurno,
  searchPendingBinnacle,
  editReliefAccepted,
  selectRelaysBinnacle,
  selectHojasTransSEC

}
