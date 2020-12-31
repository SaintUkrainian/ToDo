import React from "react";

import "./Todo.css";

const todo = (props) => {
    return (
        <div className="Todo">
            <div>
                <h1 style={{
                    textDecorationLine: props.done ? "line-through" : "none",
                    textDecorationColor: "rgb(20, 63, 200)",
                    textDecorationThickness: 5,
                }}>{props.todo.aim}</h1>
            </div>
            <p style={{
                textDecorationColor: "rgb(20, 63, 200)",
                textDecorationLine: props.done ? "line-through" : "none",
                textDecorationThickness: 3,
            }}>{props.todo.description}</p>
            <div>
                <button onClick={props.setDone} style={{color: "green"}}>Done!</button>
                <button onClick={props.delete}>Delete</button>
            </div>
        </div>
    );

};
export default todo;
