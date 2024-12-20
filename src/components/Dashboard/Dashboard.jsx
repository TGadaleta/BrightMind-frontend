import React, { useEffect, useState } from 'react';
import { AuthedUserContext } from '../../App';
import * as userServices from '../../services/userServices.js'
import { Link } from 'react-router-dom';

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
			setTodos(userTodosData)
		}
		if (user) fetchUserData();
	}, [courses, todos])

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
				<p key={todo._id}>{todo.text}</p>
			))}
		</section>
		</>
	);
};

export default Dashboard;
