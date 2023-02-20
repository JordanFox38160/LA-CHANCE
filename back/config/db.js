const mongoose = require('mongoose');

//Ici on s'occupe de la connexion a mongoDB
mongoose
    .connect('mongodb+srv://coofox3000:P5no5cC2vrEsWRPp@cluster0.jpn9xax.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    //On renvoie un message si la connexion a réussis, sinon on renvoie une erreur
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Failed to connect to MongoDB", err)); 