import React, { useState } from "react";
import { api } from "./App";

const TaskForm = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const newTask = () => {
    api
      .post("/tarefas/adicionar", {
        id: Math.floor(Math.random() * 100),
        text,
        category,
        isCompleted: false,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="taskform">
      <h3>Nova Tarefa</h3>
      <form onSubmit={newTask}>
        <input
          type="text"
          placeholder="digite a nova tarefa... "
          onChange={(event) => setText(event.target.value)}
        />
        <input
          type="text"
          placeholder="digite a categoria da sua tarefa... (Ex: Trabalho, Estudo etc)"
          onChange={(event) => setCategory(event.target.value)}
        />
        <button className="criarTarefa" type="submit">
          Criar Tarefa
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
