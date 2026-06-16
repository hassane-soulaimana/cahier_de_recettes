const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connexionDB = require('./config/db.js');
const port = 6000;
const swaggerUi = require('swagger-ui-express');                    
const swaggerFile = require('./swagger-output.json');    

dotenv.config();
connexionDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/recettes',     require('./routes/recette.js'));
app.use('/utilisateurs', require('./routes/utilisateurs.js'));

app.get('/', (req, res) => {
  res.json({ message: '🍝 API Recettes opérationnelle !' });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});