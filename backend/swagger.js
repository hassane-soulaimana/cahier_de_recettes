const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const fs = require('fs');
const yaml = require('js-yaml');

const doc = {
  info: {
    title: 'Cahier de Recettes API',
    version: '1.0.0',
    description: 'API pour gérer et partager des recettes de cuisine'
  },
  servers: [{ url: 'http://localhost:6000' }],
  tags: [
    { name: 'Recettes',     description: 'Gestion des recettes' },
    { name: 'Utilisateurs', description: 'Gestion des utilisateurs' },
    { name: 'Commentaires', description: 'Commentaires sur les recettes' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  const jsonContent = require('./swagger-output.json');
  const yamlContent = yaml.dump(jsonContent);
  fs.writeFileSync('./swagger-output.yaml', yamlContent);
  console.log('swagger-output.yaml généré !');
});