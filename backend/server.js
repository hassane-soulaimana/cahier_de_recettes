const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connexionDB = require ('./config/db.js');
const port = 3000;

dotenv.config();
connexionDB();

const app = express();
app.use(express.json()); // parse le json

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