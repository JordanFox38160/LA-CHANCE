const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

//Service de récupération de tout les users
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);

}

//Service de récupération d'un seul user
module.exports.usersInfo = (req, res) => {
    //On vérifie si l'ID est valide
    if (!ObjectID.isValid(req.params.id))
        //Alors ont renvoi un status 400 en précisant que l'ont ne connais pas l'ID
        return res.status(400).send('ID unknown :' + req.params.id)
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID Unknow: ' + err)
        //Ici on précise que l'ont ne souhaite pas renvoyer le password
    }).select('-password');
};

//Ici on gére la mise a jour d'un post
module.exports.updateUser = async (req, res) => {
    //On vérifie si l'ID est valide
    if (!ObjectID.isValid(req.params.id))
        //Alors ont renvoi un status 400 en précisant que l'ont ne connais pas l'ID
        return res.status(400).send('ID unknown :' + req.params.id);

    if (req.auth.isAdmin || post.userId == req.auth.userId) {
        const imgUploaded = Boolean(req.file)
        let initialPost;
        const postObject = req.file ?
            {
                ...req.body,
                picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };

        if (imgUploaded) {
            initialPost = await PostModel.findOne({ _id: req.params.id });
        }

        UserModel.findByIdAndUpdate({ _id: req.params.id }, { ...postObject })
            .then(() => {
                if (imgUploaded) {
                    const filename = initialPost.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => { });

                }
                res.status(200).json({ message: 'Objet modifié !' })
            }
            )
    } else {
        res.status(400).json({ message: 'Impossible de modifier !' })
    }

}

//ENVOIE ET CREATION DE MESSAGE PRIVER
module.exports.createMessage = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    message_private: {
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