"use client";
import React from "react";
import { TodoType } from "@/app/page";
import Todo from "./Todo";
import styles from "./todos.module.css";
import { useRouter } from "next/navigation";

interface Props {
  todos: TodoType[];
  loading: boolean;
}

export default function Todos({ todos, loading }: Props) {
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  if (!todos?.length) return <p>You haven't added any tasks yet.</p>;

  return (
    <ul className={styles.todosContainer}>
      {todos?.map((todo: TodoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
