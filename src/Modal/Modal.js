import React from "react";
import styles from "../index.module.css";

export default class Modal extends React.Component {
  //заводим state
  state = {
    isOpen: false,
  };

  render() {
    return (
      //чтобы React не добавлял другого элемента используем React.Fragment
      <React.Fragment>
        <button
          className={styles.btn__modal}
          onClick={() => this.setState({ isOpen: true })}
        >
          Discription
        </button>

        {this.state.isOpen && (
          <div className={styles.modal}>
            <div className={styles.modal_body}>
              <h1 className={styles.h1__modal}>Simple tasks-manager</h1>
              <p className={styles.text__modal}>
                В приложении Вы можете создавать список дел, помечать
                выполненные и удалять ненужные.
                <br></br>
                Приятного пользования!!!
              </p>
              <button
                className={styles.btn__modal}
                onClick={() => this.setState({ isOpen: false })}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
