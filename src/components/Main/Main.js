import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import TransitionGroup from "react-transition-group/cjs/TransitionGroup";
import CSSTransition from "react-transition-group/cjs/CSSTransition";
import Todo from "../Todo/Todo";
import "./Main.css";
import {connect} from "react-redux";

function Main(props) {
    const [todo, setTodo] = useState({
        aim: "",
        description: "",
        done: false,
    });
    const {authenticated} = props;
    const [todos, setTodos] = useState([]);
    const [fetchingTodos, setFetchingTodos] = useState(true);
    useEffect(() => {
        if (authenticated) {
            axios.get("https://todoapp-85a8f-default-rtdb.europe-west1.firebasedatabase.app/todos.json").then(response => {
                const transformedTodos = [];
                for (const todo in response.data) {
                    const transformedTodo = {
                        id: todo,
                        ...response.data[todo],
                    }
                    transformedTodos.push(transformedTodo);
                }
                setTodos(transformedTodos);
                setFetchingTodos(false);
            }).catch(error => {
            });
        } else {

        }

    }, [authenticated]);

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
            done: false,
        });
    }

    const addTodo = () => {
        if (!todo.aim || !todo.description) {
            return;
        }
        axios.post("https://todoapp-85a8f-default-rtdb.europe-west1.firebasedatabase.app/todos.json", todo).then(response => {
            setTodos(prevState => prevState.concat({
                id: response.data.id,
                aim: todo.aim,
                description: todo.description,
                done: false,
            }));
        }).catch(error => {
        });
        clearTodo();
    }

    const deleteTodo = (id) => {
        axios.delete("https://todoapp-85a8f-default-rtdb.europe-west1.firebasedatabase.app/todos/" + id + ".json").then(response => {
            console.log(response);
        });
        setTodos(prevState => prevState.filter(todo => todo.id !== id));
    }

    const setDone = (id) => {
        let updatedTodo = {};
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                updatedTodo = {...todo, done: true};
                return updatedTodo;
            }
            return todo;
        }));
        console.log(updatedTodo);
        axios
            .patch("https://todoapp-85a8f-default-rtdb.europe-west1.firebasedatabase.app/todos/" + id + ".json",
                {
                    aim: updatedTodo.aim,
                    description: updatedTodo.description,
                    done: updatedTodo.done
                })
            .then(response => console.log(response));
    }

    let itemToBeDisplayed = null;

    if (authenticated) {
        if (fetchingTodos) {
            itemToBeDisplayed = <Spinner/>;
        } else {
            itemToBeDisplayed = (
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
            );
        }
    } else {
        itemToBeDisplayed = (
            <h1 style={{color: "orange"}}>You should login/sign up in order
                to make todos!</h1>
        );
    }
    return (
        <React.Fragment>
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
            {itemToBeDisplayed}
        </React.Fragment>

    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.authenticated,
    }
}

export default connect(mapStateToProps)(Main);