const http = require('http');
const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;
const cors = require('cors');
require('./config/db');

const multer = require('../back/middleware/multer-config');

const auth = require('../back/middleware/auth')

const userController = require('../back/controller/userController');
const authController = require('../back/controller/authController');
const postController = require('../back/controller/postController');

app.use(express.json());


//Initialisation du serveur node
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('SERVER');
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});

//Création de l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// app.use((req, res, next) => {
//     res.status(404).sendFile('main.html', { root: 'public' })
//     next();
// });



//Route post pour crée un compte
app.post("/api/account", authController.inscription)

//Route post pour crée un compte
app.post("/api/connexion", authController.connexion)

//Route post pour ajouter une photo de profil
app.put("/:id", auth, multer, userController.updateUser)

//Route pour récupéré tout les users
app.get('/', userController.getAllUsers);

//Route pour récupéré un user (suivant son id)
app.get('/:id', userController.usersInfo);

//Route pour ajouter une bio
app.patch('/:id', auth, authController.addBio)

//Route pour crée un post
app.post('/api/topic', auth, postController.createTopic)

//Commentaires
//Route pour commenter un post
app.patch('/api/topic/:id', auth, postController.commentTopic);

//Route pour récupéré un post
app.get('/api/topic/:id', postController.readOneTopic);

//Route pour lire tout les post
app.get('/api/topic', postController.readAllTopic);

//Route pour envoyer un message privée
app.patch('/api/private_message/:id', auth, userController.createMessage)

app.listen(port, () => {
    console.log(`Api lancé a l'adresse suivante http://localhost:${port}`);
});