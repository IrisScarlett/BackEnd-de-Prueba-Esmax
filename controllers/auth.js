const bcrypt = require('bcrypt')
const { buscarUserPorUsername } = require('../database/querys')
const { generarJWT } = require('../helpers/jwt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
  try {
    const {username,password}=req.body
  // console.log(password)
  const datosUser= await buscarUserPorUsername([username])
  if(datosUser.length===0){
    return res.status(200).json({
      ok:false,
      msg: 'Usuario no registra como empleado'
    })
  }else{
    const {usr_password,usr_cargo_id,usr_nombre,usuario_id,usr_planta_id}=datosUser[0]
    const comprobacion = bcrypt.compareSync(password, usr_password)  
    if (comprobacion) {
      const token=await generarJWT(username,usr_cargo_id,usr_nombre,usuario_id,usr_planta_id)
      return res.status(200).json({
        ok:true,
        msg: 'Ingreso correcto',
        token
      })
    } else {
      return res.status(200).json({
        ok:false,
        msg: 'Credenciales incorrectas'
      })
    }
  }
  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg: 'Ha ocurrido un error, porfavor intente mas tarde'
    })
  }
  }


const validarJWT=async (req,res) => {
  const {token}=req.body
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Ocurrió un problema, identifiquese nuevamente porfavor'
    })
  }else{
   try {
    const datos= jwt.verify(token, process.env.SECRET_JWT_SEED)
    return res.status(200).json({
      ok:true,
      msg:'Validacion correcta',
      datos
    })
   } catch (error) {
    return res.status(200).json({
      ok:false,
      msg: 'Ocurrió un problema, identifiquese nuevamente porfavor'
    })   }
  }
}

module.exports = {
  login,
  validarJWT
}