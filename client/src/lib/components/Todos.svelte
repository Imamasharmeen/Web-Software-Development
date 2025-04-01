<script>
  import TodoForm from "./TodoForm.svelte";
  import TodoList from "./TodoList.svelte";

  let todos = $state([]);

  const addTodo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const todo = Object.fromEntries(formData);
    todo.id = crypto.randomUUID();
    todos.push(todo);
    e.target.reset();
  };

  const removeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
  };
</script>

<h1>Todos</h1>

<h2>Add Todo</h2>
<TodoForm {addTodo} />

<h2>Existing todos</h2>
<TodoList {todos} {removeTodo} />