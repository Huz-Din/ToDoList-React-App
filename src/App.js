//базово импортируем все используемые файлы
import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
//скрываем импорт компонента AddTodo (input + button), чтобы не попал в финальный bundle
// import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
import styles from "./index.module.css";

//lazy-лоадим компанент AddTodo
const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      //искусственно замедляем динамическую загрузку импорта, чтобы увидеть работу метода lazy
      setTimeout(() => {
        resolve(import("./Todo/AddTodo"));
      }, 3000);
    })
);

function App() {
  const [todos, setTodos] = React.useState([
    //так как данные прилетаю с сервера, принудательный (стартовый) массив не нужен
    // { id: "1", completed: false, title: "Get up" },
    // { id: "2", completed: false, title: "Clear room" },
    // { id: "3", completed: false, title: "Doing homework" },
  ]);
  //создаем новый state, по умолчанию передаем параметр true
  const [loading, setLoading] = React.useState(true);

  //пользуемся хуком useEffect и передаем метод fetch для получения данных с сервера
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .then((response) => response.json())
      .then((todos) => {
        //симулируем задержку ответа сервера (2с = 2000 мс), затем возвращаем данные в todos
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
        // setTodos(todos);
      });
  }, []);

  //функция для перечеркивания (выделения) выполненных задач
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  //стартовый шаблон (запуск приложения)
  return (
    //Context.Provider для работы с Context-ом миграции данных между файлами приложения
    <Context.Provider value={{ removeTodo }}>
      <div className={styles.wrapper}>
        <Modal />
        <h1 className={styles.heading__todolist}>ToDoList</h1>

        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p className={styles.notodos__todolist}>You done all tasks!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
