import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { db } from "./db/database.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

//________________________________________________USUARIOS_____________________________________________
//endpoint para obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

app.post('/api/login', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body

  try {
    const resultadoUsuario = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = $1', [nombre_usuario]);
    const usuario = resultadoUsuario.rows[0];

    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" })
    }

    const contraseñaCoincide = await bcrypt.compare(contraseña, usuario.contraseña)

    if (!contraseñaCoincide) {
      return res.status(401).json({ error: 'Contraseña invalida' })
    }

    res.status(200).json({
      message: 'Bienvenido ' + usuario.nombre,
      id: usuario.id,
      rol: usuario.rol,
      nombre: usuario.nombre
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
});

//________________________________________________PACIENTES_____________________________________________
//endpoint para registrar paciente
app.post('/api/registro/paciente', async (req, res) => {
  const { nombre, email, contraseña, fecha_nacimiento, nombre_usuario, numero_telefono, estatura, peso, tipo_sangre, alergias } = req.body; //desestructuración de objetos, lo que viene en el req.body se mapea a cada una de las variables definidas
  const rol = 'Paciente';

  try {
    const existeEmail = await db.query('SELECT id FROM usuarios where email = $1', [email])
    if (existeEmail.rows.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado, por favor introduzca otro" })
    }

    const existeUsuario = await db.query('SELECT id FROM usuarios where nombre_usuario = $1', [nombre_usuario])
    if (existeUsuario.rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya se encuentra registrado" })
    }

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

    res.status(201).json({ message: 'Paciente registrado exitosamente' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error al registrar paciente' });
  }
});

//________________________________________________SERVICIOS_____________________________________________
//endpoint para obtener servicios
app.get('/api/servicios', async (req, res) => {
  try {
    const query = `
      SELECT 
        s.id,
        s.nombre_servicio,
        s.descripcion_servicio,
        s.costo_servicio,
        s.comentarios_adicionales,
        COALESCE(array_agg(ds.id_doctor) FILTER (WHERE ds.id_doctor IS NOT NULL), '{}') AS medicos
      FROM servicios s
      LEFT JOIN doctores_servicios ds 
        ON s.id = ds.id_servicio
      GROUP BY 
        s.id,
        s.nombre_servicio,
        s.descripcion_servicio,
        s.costo_servicio,
        s.comentarios_adicionales
      ORDER BY s.nombre_servicio ASC;
    `;
    const resultado = await db.query(query);

    return res.status(200).json(resultado.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los servicios' })
  }
})
//endpoint para actualizar servicios
app.put("/api/actualizar-servicio/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre_servicio, descripcion_servicio, costo_servicio, comentarios_adicionales, medicos } = req.body;

  try {
    await db.query(
      `UPDATE servicios
       SET nombre_servicio = $1,
           descripcion_servicio = $2,
           costo_servicio = $3,
           comentarios_adicionales = $4
       WHERE id = $5`,
      [nombre_servicio, descripcion_servicio, costo_servicio, comentarios_adicionales, id]
    );

    await db.query(`DELETE FROM doctores_servicios WHERE id_servicio = $1`, [id]);

    if (medicos.length > 0) {
      const values = [];
      const placeholders = medicos
        .map((m, i) => {
          values.push(m, id); // agregamos doctor y servicio
          const idx = i * 2; // índice para los placeholders
          return `($${idx + 1}, $${idx + 2})`;
        })
        .join(",");

      const query = `
        INSERT INTO doctores_servicios (id_doctor, id_servicio)
        VALUES ${placeholders}
      `;

      await db.query(query, values);
    }

    res.status(200).json({ message: "Servicio actualizado correctamente" });
  } catch (error) {
    console.error("Error en actualizar servicio: " + error);
    res.status(500).json({ error: "Error al actualizar el servicio" });
  }
});

app.post("/api/registrar-servicio", async (req, res) => {
  const { nombre_servicio, descripcion_servicio, costo_servicio, comentarios_adicionales, medicos } = req.body
  try {
    const resultadoServicio = await db.query(`INSERT INTO servicios (nombre_servicio, descripcion_servicio, costo_servicio, comentarios_adicionales)
      VALUES ($1, $2, $3, $4) RETURNING id`, [nombre_servicio, descripcion_servicio, costo_servicio, (comentarios_adicionales != "" ? comentarios_adicionales : null)]);

    const idServicioRegistrado = resultadoServicio.rows[0].id;

    const values = [];
    const placeholders = medicos
      .map((m, i) => {
        values.push(m, idServicioRegistrado); // agregamos doctor y servicio
        const idx = i * 2; // índice para los placeholders
        return `($${idx + 1}, $${idx + 2})`;
      })
      .join(",");

    const query = `
      INSERT INTO doctores_servicios (id_doctor, id_servicio)
      VALUES ${placeholders}
    `;

    await db.query(query, values);
    res.status(200).json({ message: "Servicio registrado" });

  } catch (error) {
    console.log("Error en registrar servicio: " + error)
    res.status(500).json({ error: "Error al registrar servicio" })
  }
});


//________________________________________________DOCTORES______________________________________________
//endpoint para obtener doctores que realizan un servicio
app.get('/api/doctores/por-servicio/:servicioId', async (req, res) => {
  const { servicioId } = req.params;
  try {
    const resultado = await db.query('SELECT d.id AS doctor_id, u.nombre, d.especialidad FROM doctores_servicios AS ds JOIN doctores AS d ON ds.id_doctor = d.id JOIN usuarios AS u ON d.id_usuario = u.id where id_servicio = $1', [servicioId]);
    if (resultado.rows.length == 0) {
      return res.status(404).json({ message: 'No se encontraron doctores para este servicio' })
    }

    res.status(200).json(resultado.rows)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de doctores.' });
  }
})
//endpoint para obtener doctores
app.get("/api/medicos-disponibles", async (req, res) => {
  try {
    const resultado = await db.query(`SELECT d.id, u.nombre FROM doctores d 
      INNER JOIN usuarios u on u.id = id_usuario 
      ORDER BY u.nombre
    `);
    res.json(resultado.rows);
  } catch (error) {
    console.log("Error al obtener médicos: ", error)
    res.status(500).json({ error: "Error al obtener médicos" })
  }
})
//endpoint para registrar doctores
app.post('/api/registro/doctor', async (req, res) => {
  const { nombre, email, numero_telefono, nombre_usuario, contraseña, especialidad, cedula_profesional } = req.body
  const rol = "Doctor"

  try {
    const existeEmail = await db.query('SELECT id FROM usuarios where email = $1', [email])
    if (existeEmail.rows.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado, por favor introduzca otro" })
    }

    const existeUsuario = await db.query('SELECT id FROM usuarios where nombre_usuario = $1', [nombre_usuario])
    if (existeUsuario.rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya se encuentra registrado" })
    }

    const encriptacion = await bcrypt.genSalt(10);
    const contraseñaEcriptada = await bcrypt.hash(contraseña, encriptacion);
    await db.query("BEGIN");

    const resultadoUsuario = await db.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol, nombre_usuario, numero_telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [nombre, email, contraseñaEcriptada, rol, nombre_usuario, numero_telefono]
    );

    const usuario_id = resultadoUsuario.rows[0].id;

    await db.query(
      'INSERT INTO doctores (especialidad, id_usuario, cedula_profesional) VALUES ($1, $2, $3)',
      [especialidad, usuario_id, cedula_profesional]
    );

    await db.query("COMMIT");

    res.status(201).json({ message: "Médico registrado exitosamente" });
  } catch (error) {
    await db.query('ROLLBACK');
    console.log(error);
    res.status(500).json({ message: "Error al registrar al Doctor" });
  }
})

//_________________________________________________AGENDA________________________________________________
//endpoint para que un doctor administre la disponibilidad de su agenda
app.put('/api/doctores/:doctor_id/disponibilidad', async (req, res) => {
  const { doctor_id } = req.params
  const { fecha, horarios } = req.body

  if (!fecha || !horarios || !Array.isArray(horarios)) {
    return res.status(400).json({ error: 'Datos de entrada no válidos' })
  }

  try {
    //ON CONFLICT nos sirve para validar si la combinacion de doctor_id y fecha ya existe, en caso de que sí, actualiza horarios, y si no, crea el registro. Esto es una propiedad de PostgreSQL que junto con el UNIQUE que se realizó al crear la tabla hace que se haga la validación
    const result = await db.query('INSERT INTO disponibilidad (doctor_id, fecha, horarios) VALUES  ($1, $2, $3) ON CONFLICT (doctor_id, fecha) DO UPDATE SET horarios = $3 RETURNING *;', [doctor_id, fecha, JSON.stringify(horarios)]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la disponibilidad.' });
  }
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});