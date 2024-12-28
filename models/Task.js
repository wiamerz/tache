const mongoose = require('mongoose');  //importer biblio de mongoose

const taskSchema = new mongoose.Schema({   // scheama pour defini les data du mongodb
    title: {
        type: String,
        required: [true, 'titre est obligatoire'],
    },
    description: {
        type: String,
        required: [true, 'Description est obligatoire'],
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema); //pour la connexion avec les autres fichier
