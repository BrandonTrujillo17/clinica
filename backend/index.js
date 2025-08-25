const express = require('express');
const db = require('./db/database'); // Importa la conexión a la base de datos
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
const port = 3000;

app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

app.post('/api/registro/paciente', async (req, res) => {
  const {nombre, email, contraseña, fecha_nacimiento, nombre_usuario, numero_telefono, estatura, peso, tipo_sangre, alergias} = req.body; //desestructuración de objetos, lo que viene en el req.body se mapea a cada una de las variables definidas
  const rol = 'Paciente';

   console.log('Valores a insertar:', [nombre, email, contraseña, rol, nombre_usuario, numero_telefono]);

  try{

    const encriptacion = await bcrypt.genSalt(10);
    const contraseñaEcriptada = await bcrypt.hash(contraseña, encriptacion);
    //await le indica al programa que debe esperar a que la promesa finalice
    await db.query('BEGIN'); //inicia transacción

    const resultadoUsuario = await db.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol, nombre_usuario, numero_telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', 
      [nombre, email, contraseñaEcriptada, rol, nombre_usuario, numero_telefono]
    );

    const usuario_id = resultadoUsuario.rows[0].id;

    await db.query(
      'INSERT INTO pacientes (id_usuario, fecha_nacimiento, estatura, peso, tipo_sangre, alergias) VALUES ($1, $2, $3, $4, $5, $6)',
      [usuario_id, fecha_nacimiento, estatura, peso, tipo_sangre, alergias]
    );

    await db.query('COMMIT')

    res.status(201).json({message: 'Paciente registrado exitosamente'});
  }catch(error){
    await db.query('ROLLBACK');
    console.error(error);
    res.status(500).json({message: 'Error al registrar paciente'});
  }
});

app.post('/api/login', async (req, res) => {
  const {nombre_usuario, contraseña} = req.body

  try {
    const resultadoUsuario = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = $1', [nombre_usuario]);
    const usuario = resultadoUsuario.rows[0];
    
    if(!usuario){
      return res.status(401).json({error: "Usuario no encontrado"})
    }

    const contraseñaCoincide = await bcrypt.compare(contraseña, usuario.contraseña)

    if(!contraseñaCoincide){
      return res.status(401).json({error: 'Contraseña invalida'})
    }

    res.status(200).json({
      message: 'Bienvenido ' + usuario.nombre,
      id: usuario.id,
      rol: usuario.rol,
      nombre: usuario.nombre
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Error en el servidor'})
  }
});

app.get('/api/servicios', async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM servicios ORDER BY nombre_servicio ASC')
    return res.status(200).json(resultado.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Error al obtener los servicios'})
  }
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});