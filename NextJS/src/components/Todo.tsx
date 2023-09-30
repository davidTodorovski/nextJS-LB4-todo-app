"use client";

import React, { useState } from "react";
import { TodoType } from "@/app/page";
import styles from "./todo.module.css";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  todo: TodoType;
};

export default function Todo({ todo }: Props) {
  const [isItInEditMode, setIsItInEditMode] = useState<boolean>(false);
  const [todoEditModeValue, setTodoEditModeValue] = useState(todo.title);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: onDeleteATodo } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { mutate: onEditATodo } = useMutation({
    mutationFn: editATodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { mutate: setIsTodoCompleted } = useMutation({
    mutationFn: setIsTodoCompletedFunc,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  async function setIsTodoCompletedFunc(data: {
    id: number;
    isCompleted: boolean;
  }) {
    const updatedData = {
      isCompleted: data.isCompleted,
    };
    try {
      const response = await fetch(`http://localhost:3000/todos/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }

  async function editATodo(data: { id: number; newData: string }) {
    const updatedData = {
      title: data.newData,
    };
    try {
      const response = await fetch(`http://localhost:3000/todos/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }

  async function deleteData(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Resource deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  return (
    <li key={todo.id} className={styles.todo}>
      {!isItInEditMode ? (
        <span
          onClick={() =>
            setIsTodoCompleted({
              id: todo.id,
              isCompleted: !todo.isCompleted,
            })
          }
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
          setIsItInEditMode(true);
          if (isItInEditMode && todoEditModeValue) {
            setIsItInEditMode(false);
            onEditATodo({ id: todo.id, newData: todoEditModeValue });
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
