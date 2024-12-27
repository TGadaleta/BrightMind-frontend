import { useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignupForm from './components/SignupForm/SignupForm';
import Landing from './components/Landing/Landing';
import SignIn from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Courses from './components/Courses/Courses';
import About from './components/About/About';
import SoloCourse from './components/SoloCourse/SoloCourse';
import * as authService from '../src/services/authServices';
import './App.css';

export const AuthedUserContext = createContext(null);

const App = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(authService.getUser());

	const handleSignout = () => {
		authService.signout();
		setUser(null);
		navigate('/');
	};


	return (
		<AuthedUserContext.Provider value={user}>
			<Navbar handleSignout={handleSignout} />
			<Routes>
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/:courseId' element={<SoloCourse />} />
        <Route path='/about' element={<About />} />
				{user ? (
					// Protected routes
					<>
						<Route path='/' element={<Dashboard />} />
            <Route path="/signout" element={<Landing />} />
					</>
				) : (
					// Not Protected
					<>
						<Route path='/' element={<Landing />} />
						<Route path='/signin' element={<SignIn setUser={setUser} />} />
						<Route path='/signup' element={<SignupForm setUser={setUser} />} />
					</>
				)}
			</Routes>
		</AuthedUserContext.Provider>
	);
};

export default App;
