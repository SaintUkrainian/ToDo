import React, { useState } from "react";

import Todo from "./Todo/Todo.js";

import styles from "./App.module.css";

function App() {
    let todoItems = null;

    const warnStyle = {
        color: "salmon",
        textDecoration: "underline",
    };

    const [todoList, setTodoList] = useState({
        todos: [],
    });

    const [aim, setAim] = useState({
        text: "",
    });
    
    const [description, setDescription] = useState({
        text: "",
    });

    const [warning, setWarning] = useState({
        message: null,
    });


    const aimHandler = (event) => {
        setWarning({
            message: null,
        });
        setAim({
            text: event.target.value,
        });
    };

    const descriptionHandler = (event) => {
        setWarning({
            message: null,
        });
        setDescription({
            text: event.target.value,
        });
    };

    const addTodoHandler = () => {
        if (!aim.text || !description.text) {
            setWarning({
                message: "Fill in all fields",
            });
            return;
        }
        const temp = [...todoList.todos];
        temp.push({
            aim: aim.text,
            description: description.text,
            key: Math.random(),
        });
        setTodoList({
            todos: temp,
        });
        setAim({
            text: "",
        });
        setDescription({
            text: "",
        });
    };


    const deleteHandler = (key) => {
      const tempArray = [...todoList.todos];
      const index = tempArray.findIndex(item => item.key === key)
      tempArray.splice(index, 1);
      setTodoList({
          todos: tempArray,
      });
      console.log("Removed!");
    };

    if (todoList.todos.length > 0) {
        todoItems = (
            <div className={styles.Todos}>
                {todoList.todos.map((todo, key) => {
                    return (
                        <Todo
                            aim={todo.aim}
                            description={todo.description}
                            key={todo.key}
                            delete={(key) => deleteHandler(key)}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <div className={styles.App}>
            <h1>Your Todos</h1>
            <h3 style={warnStyle}>{warning.message}</h3>
            <div className={styles.SetTodo}>
                <input
                    type="text"
                    onChange={(event) => aimHandler(event)}
                    placeholder="Your Aim"
                    value={aim.text}
                />
                <textarea
                    type="text"
                    onChange={(event) => descriptionHandler(event)}
                    placeholder="Description"
                    value={description.text}
                />
                <button onClick={addTodoHandler}>Add TODO</button>
            </div>
            {todoItems}
        </div>
    );
}

export default App;
