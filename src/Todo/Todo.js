import React from "react";

import styles from "./Todo.module.css";

const todo = (props) => {
    console.log(props);
    return (
        <div className={styles.Todo}>
            <div>
                <h1>{props.aim}</h1>
            </div>
            <p>{props.description}</p>
            <div>
                <button onClick={props.delete}>Delete</button>
            </div>
        </div>
    );
    
};
export default todo;
