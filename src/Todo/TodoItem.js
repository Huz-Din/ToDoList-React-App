import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import styles from "../index.module.css";

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = [];

  if (todo.completed) {
    classes.push("done");
  }

  return (
    <li className={styles.li__todolist}>
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          checked={todo.comleted}
          className={styles.input__todolist}
          onChange={() => onChange(todo.id)}
        />
        <strong className={styles.index__todolist}>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      <button
        className={styles.button__todolist}
        onClick={removeTodo.bind(null, todo.id)}
      >
        &times;
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
