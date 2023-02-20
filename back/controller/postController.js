const TopicModel = require('../models/topic.model')
const ObjectID = require('mongoose').Types.ObjectId;

//Ici on gére la création d'un post
module.exports.createTopic = async (req, res) => {
    const newPost = new TopicModel({
        userId: req.body.userId,
        pseudo: req.body.pseudo,
        message: req.body.message,
        title: req.body.title,
    });
    console.log(newPost)

    //Ici on incrémente notre data dans notre base de donnée mongoDB
    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err)
    }
}

//Ici on gère l'ajout d'un commentaire
module.exports.commentTopic = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return TopicModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

//Service de récupération des post d'un seul user
module.exports.readOneTopic = (req, res) => {
    //On vérifie si l'ID est valide
    if (!ObjectID.isValid(req.params.id))
        //Alors ont renvoi un status 400 en précisant que l'ont ne connais pas l'ID
        return res.status(400).send('ID unknown :' + req.params.id)
    TopicModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID Unknow: ' + err)
        //Ici on précise que l'ont ne souhaite pas renvoyer le password
    })
};

//Ici on gére la récupération de TOUT les post
module.exports.readAllTopic = (req, res) => {
    TopicModel.find((err, docs) => {
        //Si il n'y pas d'erreur, alors on renvoie la data (docs)
        if (!err) res.send(docs);
        else console.log('Error to get data' + err);
        //Ici on utilise.sort pour pouvoir afficher le dernier message en 1er
    }).sort({ createdAt: -1 });

};