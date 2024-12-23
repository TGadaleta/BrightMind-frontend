import React, { useEffect, useState } from "react";
import { AuthedUserContext } from "../../App";
import * as userServices from "../../services/userServices.js";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const user = React.useContext(AuthedUserContext);
  const [courses, setCourses] = useState([]);
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ text: "" });
  const userId = user._id;

  useEffect(() => {
    const fetchUserData = async () => {
      const userCoursesData = await userServices.indexCourses(userId);
      const userTodosData = await userServices.indexTodos(userId);
      setCourses(userCoursesData);
      if (JSON.stringify(todos) !== JSON.stringify(userTodosData)) {
        setTodos(userTodosData);
      }
    };
    if (user) fetchUserData();
  }, [user]);

  const handleChange = (evt) => {
	setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {

  };

  const deleteTodo = () => {}

  const editTodo = () => {};

  const dropCourse = () => {}

  const completeTodo = async (e, todoId) => {
    //Chat-GPT
    e.preventDefault();

    try {
      const currentTodo = todos.find((todo) => todo._id === todoId);
      if (!currentTodo) return;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
        )
      );

      const updatedTodo = {
        text: currentTodo.text,
        isComplete: !currentTodo.isComplete,
      };

      await userServices.updateTodos(userId, todoId, updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <h2>Enrolled Courses</h2>
        {courses.map((course) => (
			<article key={course._id}> 
          <Link to={`/courses/${course._id}`}>
            <article>{course.name}</article>
          </Link>
		  <button onClick={dropCourse(course._id)}>Drop</button>
		  </article>
        ))}
      </section>

      <section>
        <h2>Todos</h2>
        {todos.map((todo) => (
          <article key={todo._id}>
            <p className={todo.isComplete ? styles.completedTodo : styles.todo}>
              {todo.text}
              <button onClick={() => editTodo(todo._id)}>Edit</button>
              <button onClick={(e) => completeTodo(e, todo._id)}>
                {todo.isComplete ? "Renew" : "Complete"}
              </button>
            </p>
          </article>
        ))}

        <form onSubmit={handleSubmit}>
          <label htmlFor="todo-input">Todo:</label>
          <textarea
            required
            type="text"
            name="text"
            id="todo-input"
            value={formData.text}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
		  <button onClick={deleteTodo}>Delete</button>
        </form>
      </section>
    </>
  );
};

export default Dashboard;
