const express = require("express")
const router = express.Router();
const {
    handleCreateTodo,
    getAllTodos,
    editTodo,
    deleteTodo,
} = require('../controllers/todo')

router.post('/create_todo', handleCreateTodo);

router.get('/getAllTodos/:userId', getAllTodos);

router.patch('/editTodo', editTodo);

router.delete('/deleteTodo', deleteTodo);

module.exports = router;