import { FormEvent } from "react";

import styles from "./page.module.css";
import Todo from "@/components/Todo";
import AddTodoForm from "../components/AddTodoForm";
import Todos from "@/components/Todos";

export interface TodoType {
  title: string;
  id: number;
  isCompleted: boolean;
}

export default async function Home() {
  const res = await fetch("http://localhost:3000/todos", { cache: "no-store" });
  const data = await res.json();
  const todos: TodoType[] = [];

  return (
    <div className={styles.todosContainer}>
      <AddTodoForm data={data} />
      {/* {data.value?.length ? (
        <ul>
          {data.value.map((todo: TodoType) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDeleteATodo={deleteATodo}
              onIsTodoCompleted={setIsTodoCompleted}
              onEditATodo={editATodo}
            />
          ))}
        </ul>
      ) : (
        <p>You haven't added any tasks yet.</p>
      )} */}
      <Todos todos={data} />
      {data.value?.length ? (
        <button
          className={`button ${styles.clearAllButton}`}
          onClick={() => {}}
        >
          Clear all tasks
        </button>
      ) : null}
    </div>
  );
}
