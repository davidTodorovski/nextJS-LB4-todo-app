"use client";
import React, { FormEvent, useState } from "react";
import { TodoType } from "@/app/page";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

import styles from "./addTodoForm.module.css";
export default function AddTodoForm() {
  const [todoValue, setTodoValue] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  async function postData(data: TodoType) {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!todoValue) return;

    const newTodo: TodoType = {
      id: new Date().valueOf(),
      title: todoValue,
      isCompleted: false,
    };

    mutate(newTodo);

    // Bez react query
    // const headers = {
    //   "Content-Type": "application/json",
    // };

    // fetch("http://localhost:3000/todos", {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(newTodo),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     router.refresh();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

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
