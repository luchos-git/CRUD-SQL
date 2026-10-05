import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



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

app.post('/personas', (req, res) => {
  res.send('Crear persona');
});

app.delete('/personas/:id', (req, res) => {
  res.send(`Eliminar persona con id: ${req.params.id}`);
});

