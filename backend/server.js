const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connexionDB = require ('./config/db.js');
const port = 6000;

dotenv.config();
connexionDB();

const app = express();

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/recettes',     require('./routes/recette.js'));
app.use('/utilisateurs', require('./routes/utilisateurs.js'));

// Route de Test
app.get('/', (req, res) => {
  res.json({ message: '🍝 API Recettes opérationnelle !' });
});


app.listen(port, () => {
  console.log(`Serveur lancé sur le port  ${port}`);
});