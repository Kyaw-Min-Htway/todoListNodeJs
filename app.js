const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
})

app.post('/tasks',(req, res) => {
    const {title} = req.body;
    const newTask = { id: tasks.length+1, title, completed: false };
    tasks.push(newTask);
    res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, completed};
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found'});
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted successfully'});
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})