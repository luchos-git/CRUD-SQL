import express from 'express';
import pool from './config/conexion.js';


const app = express();
const PORT = 3000;

//test connection
pool.getConnection()

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Api rest mySQL');
});



app.get('/personas', (req, res) => {
  res.send('Lista de personas');
});

app.get('/personas/:id', (req, res) => {
  res.send(`Persona con id: ${req.params.id}`);
});

app.put('/personas/:id', (req, res) => {
  res.send(`Actualizar persona con id: ${req.params.id}`);
});

//nuevo registro
app.post('/personas', async(req, res) => {
  const valor = req.body;
  const sql = 'INSERT INTO personas SET ?';

  try {
    const connection = await pool.getConnection();
    connection.release();
    const [rows] = await connection.query(sql, [valor]);

    res.status(201).send('Persona creada exitosamente');
  } catch (error) {
    res.status(500).send('Error al crear persona');
  }

  res.send('Crear persona');
});

app.delete('/personas/:id', (req, res) => {
  res.send(`Eliminar persona con id: ${req.params.id}`);
});




app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



