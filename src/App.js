import "./App.css";
import Header from "./MyComponenets/Header";
import TodoItems from "./MyComponenets/TodoItems";
import Footer from "./MyComponenets/Footer";
import AddTodo from "./MyComponenets/AddTodo";
import Todos from "./MyComponenets/Todos";
import About from "./MyComponenets/About";
import React, { useState, useEffect } from "react";
import { cleanup } from "@testing-library/react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am ondelete of todos", todo);
    //Deleting this way in react does not work
    // let index = todos.indexOf(todos);
    // todos.splice(index,1);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      let sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Header title="My Todo List" searchBar={true} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <AddTodo addTodo={addTodo} todos={todos} onDelete={onDelete} />
            }
          ></Route>
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
