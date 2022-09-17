const express = require('express')
const { handleTodosList, handleNewTodo, handleUpdateTodo, handleDeleteTodo } = require('../../controller/todoController');

const router =  express.Router();

router.get('/', handleTodosList)
router.post('/', handleNewTodo)
router.put('/', handleUpdateTodo)
router.patch('/', handleDeleteTodo)

module.exports = router