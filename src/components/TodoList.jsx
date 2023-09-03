import React, { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../redux/Todos/todoSlice";

const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const {
    data: Todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = () => {
    addTodo({ id: Math.random(), name: inputData, completed: false });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (isError) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          onChange={(e) => setInputData(e.target.value)}
          type="text"
          placeholder="Enter Todo name"
        />
        <button>Add Todo</button>
      </form>

      {isLoading ? "Loading..." : null}
      {isError ? <h1>{error}</h1> : null}
      {isSuccess ? (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "20px",
            }}
          >
            {Todos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  width: "30%",
                  height: "200px",
                  border: "1px solid black",
                }}
              >
                <h2
                  style={
                    todo.completed ? { textDecoration: "line-through" } : null
                  }
                >
                  {todo.name}
                </h2>
                <label htmlFor="Completed">Completed</label>
                <input
                  type="checkbox"
                  id="Completed"
                  checked={todo.completed}
                  onChange={() => {
                    updateTodo({ ...todo, completed: !todo.completed });
                  }}
                />
                <button onClick={() => deleteTodo({ id: todo.id })}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default TodoList;
