import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import * as userServices from '../../services/userServices.js';

const Dashboard = () => {
	const user = React.useContext(AuthedUserContext);
	const [courses, setCourses] = useState([]);
	const [todos, setTodos] = useState([]);
	const [formData, setFormData] = useState({ text: '' });
	const userId = user._id;

	const fetchTodos = async () => {
		try {
			const userTodosData = await userServices.indexTodos(userId);
			setTodos(userTodosData);
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userCoursesData = await userServices.userCourses(userId);
				setCourses(userCoursesData);
				await fetchTodos();
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		if (userId) fetchUserData();
	}, [userId]);

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
			setFormData({ text: '' });
			await fetchTodos();
		} else {
			await handleCreateTodo();
		}
	};

	const handleCreateTodo = async () => {
		try {
			const updatedFormData = { ...formData, isComplete: false };
			await userServices.createTodo(userId, updatedFormData);
			setFormData({ text: '' });
			await fetchTodos();
		} catch (error) {
			console.error('Error creating todo:', error);
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
				setFormData({ text: '' });
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
			console.error('Error completing todo:', error);
		}
	};

	return (
		<>
			<Navbar />
			<Typography
				variant='h4'
				sx={{
					textAlign: 'center',
					marginTop: '65px',
					fontWeight: 'bold',
				}}
			>
				{user.username}'s Dashboard
			</Typography>
			<Box
				sx={{
					marginTop: '20px',
					display: 'flex',
					flexDirection: 'row',
					gap: 3,
					padding: '0 20px',
					width: '100%',
					maxWidth: '1600px',
					justifyContent: 'center',
				}}
			>
				{/* Enrolled Courses Section */}
				<Paper
					sx={{
						padding: 7,
						backgroundColor: '#e3f2fd',
						borderRadius: '8px',
						boxShadow: 3,
						flex: '1',
						minWidth: '600px',
						width: '100%',
					}}
				>
					<Typography
						variant='h5'
						gutterBottom
						sx={{
							color: '#1976d2',
							borderBottom: '2px solid #1976d2',
						}}
					>
						Enrolled Courses
					</Typography>
					{courses.map((course) => (
						<Box
							key={course._id}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								textAlign: 'left',
								marginBottom: '10px',
							}}
						>
							<Link to={`/courses/${course._id}`}>
								<Typography variant='body1' sx={{ color: '#333' }}>
									{course.name}
								</Typography>
							</Link>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => dropCourse(userId, course._id)}
							>
								Drop
							</Button>
						</Box>
					))}
				</Paper>

				{/* Todos Section */}
				<Paper
					sx={{
						padding: 7,
						backgroundColor: '#f3e5f5',
						borderRadius: '8px',
						boxShadow: 3,
						flex: 1,
						minWidth: '600px',
						width: '100%',
					}}
				>
					<Typography
						variant='h5'
						gutterBottom
						sx={{
							color: '#9c27b0',
							borderBottom: '2px solid #9c27b0',
						}}
					>
						Todos
					</Typography>

					{todos.map((todo) => (
						<Box
							key={todo._id}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '10px',
								width: '100%',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									wordWrap: 'break-word',
									flex: 1,
									paddingRight: '0 10px',
								}}
							>
								<Typography
									variant='body1'
									sx={{
										textDecoration: todo.isComplete ? 'line-through' : 'none',
										color: '#333',
										textAlign: 'left',
									}}
								>
									{todo.text}
								</Typography>
							</Box>

							<Box sx={{ display: 'flex', gap: 1 }}>
								<Button
									variant='contained'
									onClick={() => editTodo(todo._id)}
									sx={{ marginRight: '10px' }}
								>
									Edit
								</Button>
								<Button
									variant='contained'
									color='primary'
									onClick={(e) => completeTodo(e, todo._id)}
								>
									{todo.isComplete ? 'Renew' : 'Complete'}
								</Button>
							</Box>
						</Box>
					))}

					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							variant='outlined'
							name='text'
							value={formData.text}
							onChange={handleChange}
							label='Add Todo'
							sx={{ marginBottom: 2 }}
						/>
						<Box>
							<Button
								variant='contained'
								type='submit'
								sx={{ marginRight: '10px' }}
							>
								{formData.editingId ? 'Update Todo' : 'Submit'}
							</Button>
							{formData.editingId && (
								<Button
									variant='outlined'
									color='error'
									onClick={handleDelete}
									sx={{
										marginLeft: '10px',
										backgroundColor: '#f44336',
										color: 'white',
									}}
								>
									Delete Todo
								</Button>
							)}
						</Box>
					</form>
				</Paper>
			</Box>
		</>
	);
};

export default Dashboard;
