"use client";

import { useState } from "react";
import { useTodoStore } from "./useTodoStore";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import React from "react";

export default function ZustandTodoList() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoStore(
    (state) => state
  );

  const [todo, setTodo] = useState({ id: "-1", title: "Learn Mango" });

  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List</h2>

      <ListGroup>
        <ListGroupItem>
          <Button
            id="wd-add-todo-click"
            onClick={() => {
              addTodo(todo.title);
              setTodo({ id: "-1", title: "" });
            }}>
            Add
          </Button>

          <Button
            id="wd-update-todo-click"
            onClick={() => {
              updateTodo(todo);
              setTodo({ id: "-1", title: "" });
            }}>
            Update
          </Button>

          <FormControl
            value={todo.title}
            onChange={(e) =>
              setTodo({ ...todo, title: e.target.value })
            }/>
        </ListGroupItem>

        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            <Button
              id="wd-delete-todo-click"
              onClick={() => deleteTodo(t.id)}>
              Delete
            </Button>

            <Button
              id="wd-set-todo-click"
              onClick={() => setTodo(t)}>
              Edit
            </Button>

            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}