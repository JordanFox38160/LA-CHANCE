const UserModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const ObjectID = require('mongoose').Types.ObjectId;

//Service d'inscription
exports.inscription = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new UserModel({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                bio: req.body.bio
            });
            user.save()
                .then(() => res.status(201).json({ user }))
                .catch(error => res.status(400).json({ error: error }));
        })
        .catch(error => res.status(500).json({ error }))
};

//Service de connexion
//Ici nous créons la function pour connecter des utilisateur déja existant
exports.connexion = (req, res, next) => {
    //Ici findOne pour trouver l'utilisateur dans la base de données.
    UserModel.findOne({ email: req.body.email }) //<=== Ici nous voulons que l'adresse mail correspond avec l'adresse mail envoyer dans la requête
        //Ici ont vérifie si la promise a réussis a récupéré un User ou non.
        .then(user => {
            if (!user) {
                //Si aucun utilisateur n'est trouver, on renvoie une erreur 404 et un json avec "Utilisateur non trouvé !"
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            //Ici ont utilise bcrypt.compare pour comparer le mot de passe envoyer avec la requête, avec le hash enregistré dans notre document user
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si valid est false ça veux dire que l'utilisateur a rentrée un mot de passe incorrect
                    if (!valid) {
                        //Ici si on trouve l'user mais que le mot de passe est incorrect, on renvoie une erreur 401 ainsi que 'Mot de passe incorrect !'
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    //Si valid est true, on renvoie un status 200. Puis, nous renvoyer un fichier json qui contient l'identifiant de l'utilisateur ainsi que le token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'TOKEN',
                            { expiresIn: '24H' },
                        )
                    });
                })
                //Ici le catch sert seulement si il y a un problème de connexion.
                .catch(error => res.status(500).json({ error }))
        })
        //Ici le catch sert seulement si il y a un problème de connexion.
        .catch(error => res.status(500).json({ error }))
};

//Service de création et de mise a jour de bio

exports.addBio = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    console.log(req.body)

    try {
        return UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    bio: req.body.bio,
                },
            },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            },
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};