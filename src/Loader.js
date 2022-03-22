import React from "react";
import styles from "./index.module.css";

function Loader() {
  return (
    <div className={styles.loader__todolist}>
      <div className={styles.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
