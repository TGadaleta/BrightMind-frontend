import { useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignupForm from './components/SignupForm/SignupForm';
import Landing from './components/Landing/Landing';
import SignIn from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Courses from './components/Courses/Courses';
import About from './components/About/About';
import * as authService from '../src/services/authServices';
import Header from './components/Header/Header';
import './App.css';

export const AuthedUserContext = createContext(null);

const App = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(authService.getUser());

	const handleSignout = () => {
		authService.signout();
		setUser(null);
		navigate('/signin');
	};

	return (
		<AuthedUserContext.Provider value={user}>
			<Navbar handleSignout={handleSignout} />
			<Routes>
				{user ? (
					// Protected routes
					<>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/courses' element={<Courses />} />
					</>
				) : (
					// Not Protected
					<>
						<Route path='/' element={<Landing />} />
						<Route path='/about' element={<About />} />
						<Route path='/signup' element={<SignupForm setUser={setUser} />} />
						<Route path='/signin' element={<SignIn setUser={setUser} />} />
					</>
				)}
			</Routes>
		</AuthedUserContext.Provider>
	);
};

export default App;
