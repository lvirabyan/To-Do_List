import { useRef } from "react";
import useTodoManager from "./hook/useTodoManager";
import "./App.css";
import {
  HEADER_TITLE,
  BUTTON_ALL,
  BUTTON_DONE,
  BUTTON_IMPORTANT,
  BUTTON_DELETE,
  BUTTON_UNDO,
  BUTTON_DONE_LABEL,
  BUTTON_ADD_ITEM,
  BUTTON_UNIMPORTANT,
  BUTTON_MARK_IMPORTANT,
  SEARCH_PLACEHOLDER,
  INPUT_PLACEHOLDER
} from "./constants/text.js";

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
        <h1>{HEADER_TITLE}</h1>
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
            placeholder={SEARCH_PLACEHOLDER}
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
            {BUTTON_ALL}
          </button>
          <button className="button-done" onClick={() => setFilter("done")}>
            {BUTTON_DONE}
          </button>
          <button
            className="button-important"
            onClick={() => setFilter("important")}
          >
            {BUTTON_IMPORTANT}
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
                  {BUTTON_DELETE}
                </button>
                <button
                  className="button-toggle-done"
                  onClick={() => handleToggleComplete(todo.id)}
                >
                  {todo.completed ? BUTTON_UNDO : BUTTON_DONE_LABEL}
                </button>
                <button
                  className={`button-toggle-important ${
                    todo.important ? "important" : ""
                  }`}
                  onClick={() => handleToggleImportant(todo.id)}
                >
                  {todo.important ? BUTTON_UNIMPORTANT : BUTTON_MARK_IMPORTANT}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="todo-input-wrapper">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={INPUT_PLACEHOLDER}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <button className="button-add" onClick={handleAddTodo}>
            {BUTTON_ADD_ITEM}
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
