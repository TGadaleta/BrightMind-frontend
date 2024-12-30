import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AuthedUserContext } from "../../App";
import React, { useEffect, useState } from "react";
import * as userServices from "../../services/userServices.js";

const Dashboard = () => {

  const user = React.useContext(AuthedUserContext);
  const [courses, setCourses] = useState([]);
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ text: "" });
  const userId = user._id;

  const fetchTodos = async () => {
    try {
      const userTodosData = await userServices.indexTodos(userId);
      setTodos(userTodosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCoursesData = await userServices.userCourses(userId);
        setCourses(userCoursesData);
        await fetchTodos();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formData.editingId) {
      await updateTodo(formData.editingId, {
        text: formData.text,
        isComplete: formData.isComplete,
      });
      setFormData({ text: "" });
      await fetchTodos();
    } else {
      await handleCreateTodo();
    }
  };

  const handleCreateTodo = async () => {
    try {
      const updatedFormData = { ...formData, isComplete: false };
      await userServices.createTodo(userId, updatedFormData);
      setFormData({ text: "" });
      await fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (todoId, updatedData) => {
    try {
      await userServices.updateTodos(userId, todoId, updatedData);
    } catch (error) {
      console.error(`Error updating todo with ID ${todoId}:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      if (formData.editingId) {
        await userServices.deleteTodo(userId, formData.editingId);
        setFormData({ text: "" });
        await fetchTodos();
      }
    } catch (error) {
      console.error(
        `Error deleting todo with ID ${formData.editingId}:`,
        error
      );
    }
  };

  const editTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo._id === todoId);
    if (todoToEdit) {
      setFormData({
        text: todoToEdit.text,
        isComplete: todoToEdit.isComplete,
        editingId: todoId,
      });
    }
  };

  const dropCourse = async (userId, courseId) => {
    try {
      await userServices.dropCourse(userId, courseId);
      const droppedCourse = courses.find((course) => course._id === courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const completeTodo = async (e, todoId) => {
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
      console.error("Error completing todo:", error);
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
            <button onClick={() => dropCourse(userId, course._id)}>Drop</button>
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
          <button type="submit">
            {formData.editingId ? "Update Todo" : "Submit"}
          </button>
          {formData.editingId && (
            <button type="button" onClick={handleDelete}>
              Delete Todo
            </button>
          )}
        </form>
      </section>
    </>
  );
};

export default Dashboard;
