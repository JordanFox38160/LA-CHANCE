const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Activer CORS pour toutes les routes
app.use(cors());

// Configurer body-parser pour gérer les requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());