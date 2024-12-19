import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm/SignupForm';
import Landing from './components/Landing/Landing';
import './App.css';
import { createContext } from 'react';

export const AuthedUserContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
	const token = localStorage.getItem('token');
	if (!token) return null;
	try {
		const user = JSON.parse(atob(token.split('.')[1]));
		return user;
	} catch (error) {
		console.error('Invalid token:', error);
		return null;
	}
};

function App() {
	const [user, setUser] = useState(getUser());

	return (
		<AuthedUserContext.Provider value={user}>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Landing setUser={setUser} />} />
					<Route path='/signup' element={<SignupForm setUser={setUser} />} />
				</Routes>
			</div>
		</AuthedUserContext.Provider>
	);
}

export default App;
