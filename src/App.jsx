import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm/SignupForm';
import Landing from './components/Landing/Landing';
import './App.css';

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
	const token = localStorage.getItem('token');
	if (!token) return null;
	const user = JSON.parse(atob(token.split('.')[1]));
	return user;
};

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className='App'>
			<Routes>
				<Route path='/signup' element={<SignupForm />} />
				<Route path='/' element={<Landing />} />
			</Routes>
		</div>
	);
}

export default App;
