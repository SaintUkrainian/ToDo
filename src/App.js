import React, {useState} from "react";

import Todo from "./Todo/Todo.js";
import "./App.css";

import TransitionGroup from "react-transition-group/TransitionGroup"
import CSSTransition from "react-transition-group/CSSTransition";

function App() {
    const [todo, setTodo] = useState({
        aim: "",
        description: "",
    });

    const [todos, setTodos] = useState([]);

    const handleInput = (event, element) => {
        setTodo({
                ...todo,
                [element]: event.target.value,
            }
        )
    };

    const clearTodo = () => {
        setTodo({
            aim: "",
            description: "",
        });
    }

    const addTodo = () => {
        if (!todo.aim || !todo.description) {
            return;
        }
        setTodos(prevState => prevState.concat({
            id: Math.random(),
            done: false,
            aim: todo.aim,
            description: todo.description
        }));
        clearTodo();
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const setDone = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, done: true} : todo));
    }

    return (
        <div className="App">
            <h1 style={{color: "white"}}>Your Todos</h1>
            <div className="SetTodo">
                <input
                    type="text"
                    onChange={(event) => handleInput(event, "aim")}
                    placeholder="Your Aim"
                    value={todo.aim}
                />
                <textarea
                    type="text"
                    onChange={(event) => handleInput(event, "description")}
                    placeholder="Description"
                    value={todo.description}
                    style={{height: 150}}
                />
                <button onClick={addTodo}>Add TODO</button>
            </div>
            <TransitionGroup component="div" className="Todos">
                {todos.map(todo =>
                    <CSSTransition classNames="fade" timeout={300}
                                   key={todo.id}>
                        <Todo key={todo.id}
                              todo={todo}
                              done={todo.done}
                              delete={() => deleteTodo(todo.id)}
                              setDone={() => setDone(todo.id)}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
}

export default App;
