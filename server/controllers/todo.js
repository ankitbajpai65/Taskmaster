const Todo = require('../models/todo');

// CREATE TODO
const handleCreateTodo = async (req, res) => {
    const { title, description, user: userId } = req.body;

    try {
        await Todo.create({
            title,
            description,
            user: userId,
        });
        return res.status(201).json({ status: "ok", message: "Todo created sucessfully" })
    } catch (error) {
        return res.status(400).json({ status: 'error', error: error })
    }
}

const getAllTodos = async (req, res) => {
    const userId = req.params.userId;

    try {
        const todos = await Todo.find({ user: userId });
        return res.json({ status: 'ok', data: todos })
    } catch (error) {
        return res.status(400).json({ status: 'error', error: error })
    }
}

const editTodo = async (req, res) => {
    const { id, title, description } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(id, { title, description })
        return res.status(201).json({ status: 'ok', data: todo })
    } catch (error) {
        return res.status(400).json({ status: 'error', error: error })
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.body;

    try {
        const todo = await Todo.findByIdAndDelete(id);
        return res.json({ status: 'ok', message: 'Deleted successfully' });
    } catch (error) {
        return res.status(400).json({ status: 'error', error });
    }
}

module.exports = {
    handleCreateTodo,
    getAllTodos,
    editTodo,
    deleteTodo,
}