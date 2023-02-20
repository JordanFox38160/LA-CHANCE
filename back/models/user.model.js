const mongoose = require('mongoose');
//Ici on utilise validator pour controler l'email
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trimp: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        bio: {
            type: String,
            max: 1024,
        },
        photoProfilURL: {
            type: String,
            required: false
        },
        message_private: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        }
    },
);


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;