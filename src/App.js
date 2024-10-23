import { useRef } from "react";
import "./App.css";
import useTodoManager from "./useTodoManager"; // Importing the custom hook

function App() {
  const {
    todos,
    inputValue,
    setInputValue,
    setFilter,
    setTodos,
    originalTodos,
    filteredTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleComplete,
    handleToggleImportant,
    handleSearch,
  } = useTodoManager();

  const searchInputRef = useRef(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MY TODO LIST</h1>
        <div className="todo-stats">
          <span>Done: {todos.filter((todo) => todo.completed).length}</span>
          <span>
            Important: {todos.filter((todo) => todo.important).length}
          </span>
        </div>
      </header>

      <section className="todo-section">
        <div className="todo-search-bar">
          <input
            placeholder="Type text for search..."
            ref={searchInputRef}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className="button-all"
            onClick={() => {
              setFilter('all');
              searchInputRef.current.value = "";
              setTodos(originalTodos);
            }}
          >
            All
          </button>
          <button className="button-done" onClick={() => setFilter("done")}>
            Done
          </button>
          <button
            className="button-important"
            onClick={() => setFilter("important")}
          >
            Important
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                className={`todo-title ${todo.completed ? "completed" : ""} ${
                  todo.important ? "important" : ""
                }`}
              >
                {todo.title}
              </span>
              <div className="todo-buttons">
                <button
                  className="button-delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="button-toggle-done"
                  onClick={() => handleToggleComplete(todo.id)}
                >
                  {todo.completed ? "Undo" : "Done"}
                </button>
                <button
                  className={`button-toggle-important ${
                    todo.important ? "important" : ""
                  }`}
                  onClick={() => handleToggleImportant(todo.id)}
                >
                  {todo.important ? "Unimportant" : "Important"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="todo-input-wrapper">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Item text..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <button className="button-add" onClick={handleAddTodo}>
            Add Item
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
