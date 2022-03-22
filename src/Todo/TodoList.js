import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import styles from "../index.module.css";

function TodoList(props) {
  return (
    <ul className={styles.ul__todolist}>
      {props.todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={props.onToggle}
          />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
