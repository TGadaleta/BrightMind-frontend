import React, { useEffect, useState } from 'react';
import { AuthedUserContext } from '../../App';
import * as userServices from '../../services/userServices.js'
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css'

const Dashboard = () => {
	const user = React.useContext(AuthedUserContext)
	const [courses, setCourses] = useState([]);
	const [todos, setTodos] = useState([]);
	const userId = user._id;

	useEffect(() => {
		const fetchUserData = async () => {
			const userCoursesData = await userServices.indexCourses(userId);
			const userTodosData = await userServices.indexTodos(userId);
			setCourses(userCoursesData)
			if (JSON.stringify(todos) !== JSON.stringify(userTodosData)) {
				setTodos(userTodosData);
			}
		}
		if (user) fetchUserData();
	}, [user])

	const editTodo = () => {

	}

	const completeTodo = (e, todoId) => {
		e.preventDefault();
		
		setTodos(prevTodos => prevTodos.map(todo => 
			todo._id === todoId ? {...todo, isComplete: true} : todo
		))

	}

	return (
		<>
		<section>
			<h2>Enrolled Courses</h2>
			{courses.map(course => (
				<Link key={course._id} to={`/courses/${course._id}`}>
					<article>
						{course.name}
					</article>
				</Link>
			))}
		</section>
		<section>
			<h2>Todos</h2>
			{todos.map(todo => (
			<>
				<p key={todo._id} className={todo.isComplete ? styles.completedTodo : styles.todo}>{todo.text}
				<button onClick={editTodo}>Edit</button>
				<button onClick={(e) => completeTodo(e, todo._id)}>{todo.isComplete ? 'Renew' : 'Complete'}</button>
				</p>
			</>
			))}
		</section>
		</>
	);
};

export default Dashboard;
