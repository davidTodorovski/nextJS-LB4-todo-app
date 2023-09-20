"use client";
import React, { FormEvent, useState } from "react";
import { TodoType } from "@/app/page";
import { useRouter } from "next/navigation";

import styles from "./addTodoForm.module.css";
export default function AddTodoForm({ data }: any) {
  const [todoValue, setTodoValue] = useState("");
  const router = useRouter();

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!todoValue) return;

    const newTodo: TodoType = {
      id: new Date().valueOf(),
      title: todoValue,
      isCompleted: false,
    };

    const headers = {
      "Content-Type": "application/json",
      // You can add other headers if needed
    };

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTodoValue("");

    console.log(todoValue);
  }
  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <label>
        Task Name
        <input
          placeholder="Add a todo..."
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          type="text"
        />
      </label>
      <button className="button">Add</button>
    </form>
  );
}
