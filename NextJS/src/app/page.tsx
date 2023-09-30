"use client";

import { FormEvent } from "react";

import styles from "./page.module.css";
import Todo from "@/components/Todo";
import AddTodoForm from "../components/AddTodoForm";
import Todos from "@/components/Todos";
import { useQuery } from "react-query";

export interface TodoType {
  title: string;
  id: number;
  isCompleted: boolean;
}

const fetchTodos = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function Home() {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchTodos("http://localhost:3000/todos"),
    queryKey: ["todos"],
  });

  return (
    <div className={styles.todosContainer}>
      <AddTodoForm />
      <Todos todos={data} loading={isLoading} />
    </div>
  );
}
