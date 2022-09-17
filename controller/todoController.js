const db = {
  todos: require("../data/todos"),
  setTodos: function (data) {
    this.todos = data;
  },
};

const fs = require("fs/promises");
const path = require("path");
const dataPath = path.join(__dirname, "..", "data", "todos.json");
const handleTodosList = (req, res) => {
  try {
    return res.status(200).send(db.todos);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get todos: " + err.message,
    });
  }
};

const handleNewTodo = async (req, res) => {
  try {
    const todo= req.body;
    const newTodo = {
      id: "todo-" + db.todos.length + 1,
      ...todo,
      status:"Created"
    };
    db.setTodos([...db.todos, newTodo]);
    await fs.writeFile(dataPath, JSON.stringify(db.todos));
    res.status(201).json({
      message: "New todo Added Successfully",
      todos: db.todos,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add new todo: " + err.message,
    });
  }
};

const handleUpdateTodo = async (req, res) => {
  try {
    const todo = req.body;
    console.log(todo)
    let currentTodo = db.todos.find((t) => t.id === todo.id);
    const otherTodos = db.todos.filter((t) => t.id !== todo.id);
    currentTodo = { ...currentTodo, ...todo };
    console.log(currentTodo)
    const updatedTodos = [...otherTodos, currentTodo];
    db.setTodos(updatedTodos);
    await fs.writeFile(dataPath, JSON.stringify(updatedTodos));
    res.status(200).json({
      message: "Updated todo Successfully",
      todos: db.todos,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update todo: " + err.message,
    });
  }
};

const handleDeleteTodo = async (req, res) => {
  try {
    // console.log("delete todo" , req)

    const {id} = req.body;
    const otherTodos = db.todos.filter((t) => t.id !== id);
    db.setTodos(otherTodos);
    await fs.writeFile(dataPath, JSON.stringify(otherTodos));
    res.status(200).json({
      message: "Deleted todo Successfully",
      todos: db.todos,
    });
    
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete todo: " + err.message,
    });
  }
};

module.exports = {
  handleTodosList,
  handleNewTodo,
  handleUpdateTodo,
  handleDeleteTodo,
};
