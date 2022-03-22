import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../index.module.css";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue("");

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form className={styles.form__todolist} onSubmit={submitHandler}>
      <input className={styles.input__form_todolist} {...input.bind} />
      <button className={styles.btn__form_todolist} type="submit">
        Add task
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
