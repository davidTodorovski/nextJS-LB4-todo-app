"use client";
import React from "react";
import { TodoType } from "@/app/page";
import Todo from "./Todo";
import styles from "./todos.module.css";
import { useRouter } from "next/navigation";

interface Props {
  todos: TodoType[];
}

export default function Todos({ todos }: Props) {
  const router = useRouter();

  function deleteATodo(id: number) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        router.refresh();
        console.log("Resource deleted successfully.");
      })

      .catch((err) => console.log("An error occured"));
  }

  function setIsTodoCompleted(id: number, isCompleted: boolean) {
    // const newTodos = todos.map((todo) =>
    //   todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    // );
    // setTodos(newTodos);
    // Replace with the ID of the todo you want to update
    const updatedData = {
      isCompleted: !isCompleted,
    };

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        router.refresh();
      })
      .catch((error) => {
        console.log("An error occured");
      });
  }

  function editATodo(id: number, newValue: string, ogValue: string) {
    if (newValue === ogValue) return;
    // const editedArray = todos.map((todo) => {
    //   return todo.id === id ? { ...todo, task: newValue } : todo;
    // });
    // setTodos(editedArray);
    const updatedData = {
      title: newValue,
    };

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        router.refresh();
      })
      .catch((error) => {
        console.log("An error occured");
      });
  }
  if (!todos?.length) return <p>You haven't added any tasks yet.</p>;

  return (
    <ul className={styles.todosContainer}>
      {todos?.map((todo: TodoType) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDeleteATodo={deleteATodo}
          onIsTodoCompleted={setIsTodoCompleted}
          onEditATodo={editATodo}
        />
      ))}
    </ul>
  );
}
