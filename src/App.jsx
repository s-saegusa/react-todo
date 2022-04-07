import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./compornents/inputTodo";
import { IncompleteTodos } from "./compornents/incompleteTodos";
import { CompleteTodos } from "./compornents/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setincompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setincompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setincompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncoompleteTodos = [...incompleteTodos];
    newIncoompleteTodos.splice(index, 1);

    const newCoompleteTodos = [...completeTodos, incompleteTodos[index]];

    setincompleteTodos(newIncoompleteTodos);
    setcompleteTodos(newCoompleteTodos);
  };

  const onClickBack = (index) => {
    const newCoompleteTodos = [...completeTodos];
    newCoompleteTodos.splice(index, 1);

    const newIncoompleteTodos = [...incompleteTodos, completeTodos[index]];
    setcompleteTodos(newCoompleteTodos);
    setincompleteTodos(newIncoompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTODOは5個までだよ～。消化しろ～
        </p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
