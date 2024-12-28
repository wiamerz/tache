const express = require('express');    //importi la bibliothèque express
const taskroutes = require('./routes/taskroutes');
const mongoose = require('mongoose');

const app = express(); 

app.use(express.json()); //li ms2ola to give the body only in requêtes http

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/task-manager').then(()=>{
    console.log('mongodb connected');
}).catch((err)=> console.log(err));

// Routes
app.use('/api/tasks', taskroutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});