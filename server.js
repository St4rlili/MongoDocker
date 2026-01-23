import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import groupRoutes from './routes/groups.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('contenido prueba')
})

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/groups', groupRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error(err));

app.listen(PORT, () => console.log(`API conectada en http://localhost:${PORT}`));
