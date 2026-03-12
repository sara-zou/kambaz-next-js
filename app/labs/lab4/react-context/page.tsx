"use client";
import { CounterProvider } from "./counter/context";
import { TodosProvider } from "./todos/todosContext";
import CounterContext from "./counter";
import React from "react";
import ReactContextTodoList from "./todos/ReactContextTodoList";

export default function ReactContextExamples() {
 return (
   <div>
     <h1>React Context Examples</h1>
     <CounterProvider>
       <CounterContext />
     </CounterProvider>
     
     <TodosProvider>
     <ReactContextTodoList/>
     </TodosProvider>
   </div>
 );
}
