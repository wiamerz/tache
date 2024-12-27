const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//creation du tâche          
router.post('/', async (req, res) => {  //async for await 
    try {
        const { title, description } = req.body; // gemme the body only
        
        if (!title || !description) {
            return res.status(400).json({ message: 'titre et description sont obligatoir' });
        }
        //creating the new task
        const task = new Task({ title, description });
        await task.save();   //await mean mtkmlch ta t save 
        
        res.status(201).json(task); //nrad task l user
    } catch (error) {
        res.status(500).json({ message: 'erreur dans la creation du tâche', error: error.message });
    }
});

//affichage des tâches
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'erreur dans l_affichage du tâche', error: error.message });
    }
});

//modification d'une tâche
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); //id li kayn f parametre dyal request
        
        if (!task) {
            return res.status(404).json({ message: 'tâche non trouvé' });
        }
        // Modifier l'état de la tâche
        task.completed = true;
        
        // Enregistrer les modifications
        await task.save();
        
        res.json(task); 
    } catch (error) {
        res.status(500).json({ message: 'Erreur dans la modification du tâche ', error: error.message });
    }
});

//suppression d'une tâche
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); 
        
        if (!task) {
            return res.status(404).json({ message: 'tâche non trouvé' });
        }

        await task.deleteOne();
        res.json({ message: 'tâche supprimer par succée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur dans la suppression du tâche', error: error.message });
    }
});


module.exports = router;
