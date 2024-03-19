import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

function App() {
  return (
    <div className="app">
      <div className="titulo-task">
        <h1>Lista de Tarefas</h1>
        <TaskForm />
      </div>

      <div className="todo-list">
        <Task />
      </div>
    </div>
  );
}

export default App;
