"use client";

import React, { useState } from "react";
import { TodoType } from "@/app/page";
import styles from "./todo.module.css";
type Props = {
  todo: TodoType;
  onDeleteATodo: (id: number) => void;
  onIsTodoCompleted: (id: number, isCompleted: boolean) => void;
  onEditATodo: (id: number, newValue: string, ogValue: string) => void;
};

export default function Todo({
  todo,
  onDeleteATodo,
  onIsTodoCompleted,
  onEditATodo,
}: Props) {
  const [isItInEditMode, setIsItInEditMode] = useState<boolean>(false);
  const [todoEditModeValue, setTodoEditModeValue] = useState(todo.title);

  return (
    <li key={todo.id} className={styles.todo}>
      {!isItInEditMode ? (
        <span
          onClick={() => onIsTodoCompleted(todo.id, todo.isCompleted)}
          className={todo.isCompleted ? styles.completedTodo : ""}
        >
          {todo.title}
        </span>
      ) : (
        <input
          className={styles.editingInput}
          type="text"
          value={todoEditModeValue}
          onChange={(e) => setTodoEditModeValue(e.target.value)}
        />
      )}

      <button
        className={`button ${styles.editTodo}`}
        onClick={() => {
          setIsItInEditMode(isItInEditMode ? false : true);
          if (isItInEditMode) {
            onEditATodo(todo.id, todoEditModeValue, todo.title);
          }
        }}
      >
        {isItInEditMode ? "Apply changes" : "Edit"}
      </button>
      <button
        onClick={() => onDeleteATodo(todo.id)}
        className={styles.removeTodo}
      >
        X
      </button>
    </li>
  );
}
