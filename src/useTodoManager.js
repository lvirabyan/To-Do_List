import { useEffect, useState, useCallback, useMemo } from "react";

const useTodoManager = () => {
  const [todos, setTodos] = useState([]);
  const [originalTodos, setOriginalTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      const slicedTodos = data.slice(0, 10);
      setTodos(slicedTodos);
      setOriginalTodos(slicedTodos);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleDeleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setOriginalTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleToggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleToggleImportant = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    );
  }, []);

  const handleAddTodo = useCallback(() => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        title: inputValue,
        completed: false,
        important: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setOriginalTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue(""); 
    }
  }, [inputValue]);

  const handleSearch = useCallback((value) => {
    if (value.trim()) {
      const filtered = originalTodos.filter((todo) =>
        todo.title.toLowerCase().startsWith(value.toLowerCase())
      );
      setTodos(filtered);
    } else {
      setTodos(originalTodos);
    }
  }, [originalTodos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "done") return todo.completed;
      if (filter === "important") return todo.important;
      return true;
    });
  }, [todos, filter]);

  useEffect(() => {
    if (filter === "all") {
      setTodos(originalTodos);
    }
  }, [filter, originalTodos]);
  return {
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
  };
};

export default useTodoManager;
