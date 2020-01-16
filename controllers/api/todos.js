const Todo = require('../../models/todo');

module.exports = {
    create,
    index,
    delete: deleteOne,
    update
};

async function create(req, res) {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
}

async function index(req, res) {
    const todos = await Todo.find({});
    res.status(200).json(todos);
}

async function deleteOne(req, res) {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedTodo);
}

async function update(req, res) {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedTodo);
}
  