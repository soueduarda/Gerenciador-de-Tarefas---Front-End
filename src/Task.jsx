import React from "react";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { api } from "./App";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    api.get("/tarefas").then((response) => {
      console.log(response.data);
      setTasks(response.data);
    });
  }, []);

  const deleteTask = (taskASerExcluida) => {
    api.delete(`/tarefas/${taskASerExcluida.id}`).then(() => {
      const newListTasks = tasks.filter(
        (task) => task.id !== taskASerExcluida.id
      );
      setTasks(newListTasks);
    });
  };

  const completeTask = (id) => {
    const newTask = [...tasks];
    newTask.map((task) =>
      task.id === id ? (task.isCompleted = !task.isCompleted) : task
    );
    setTasks(newTask);
  };

  const updateTask = (id, updatedTask) => {
    api.put(`/tarefas/${id}`, updatedTask).then(() => {
      const taskUpdated = tasks.map((task) => {
        if (task.id === id) {
          return { ...tasks, ...updatedTask };
        }
        return task;
      });
      setTasks(taskUpdated);
      setEditingTask(null);
      setEditText("");
      setEditCategory("");
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditText(task.text);
    setEditCategory(task.category);
  };

  const handleSave = () => {
    const taskUpdated = {
      text: editText,
      category: editCategory,
    };
    updateTask(editingTask.id, taskUpdated);
  };

  return (
    <div className="todo">
      {tasks.map((task) => (
        <div
          className="geralg"
          style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
          key={task.id}
        >
          {editingTask === task ? (
            <div>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
              <button onClick={handleSave}> Salvar </button>
            </div>
          ) : (
            <div className="content" key={task.id}>
              <div className="editIcon">
                <p>Descrição: {task.text}</p>
                <Button
                  onClick={() => handleEdit(task)}
                  className="buttonIcon"
                  variant="filled"
                  startIcon={<EditIcon sx={{ fontSize: 20 }} />}
                ></Button>
              </div>
              <div className="category">
                <p>Categoria: {task.category}</p>
              </div>
              <div className="botoesVV">
                <button
                  className="concluir"
                  onClick={() => completeTask(task.id)}
                >
                  Concluir
                </button>
                <button className="remover" onClick={() => deleteTask(task)}>
                  Remover
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Task;
