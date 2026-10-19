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



app.get('/personas', async (req, res) => {
  // res.send('Lista de personas');
  
  const sql = 'SELECT * FROM personas';
  try{
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql);
    connection.release();
    res.json(rows);
  }catch(error){
    res.status(500).send('Error, no se pudo realizar la consulta');
  }
  
});

app.get('/personas/:id', async (req, res) => {
   const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM personas WHERE id = ?';
  try{
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    rows[0] ? res.json(rows[0]) : res.status(404).send('No hay resultados');
  }catch(error){
    res.status(500).send('Error, no se pudo realizar la consulta');
  }
});

app.put('/personas/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const valores = req.body;
  const sql = 'UPDATE personas SET ? WHERE id = ?';
  try {
  const connection = await pool.getConnection();
  const [rows] = await connection.query(sql, [valores, id]);
  connection.release();
  rows.affectedRows == 0 ? res.send('Persona no encontrada') : res.status(200).send('Persona actualizada exitosamente');

  }catch (error) {
    res.status(500).send('Error al actualizar persona');
  }
})



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

app.delete('/personas/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM personas WHERE id = ?';

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    rows.affectedRows == 0 ? res.send('Persona no encontrada') : res.status(200).send();
  } catch (error) {
    res.status(500).send('Error al eliminar persona');
  }
});




app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//npm run dev = agrega nodemon para actualizar el codigo automaticamente
//npm run start = inicia sin actualizar nuevo codigo
