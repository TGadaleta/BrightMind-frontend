import './App.css';
import About from './components/About/About';
import { useState, createContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Courses from './components/Courses/Courses';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SoloCourse from './components/SoloCourse/SoloCourse';
import LessonPage from './components/Lesson2/Lesson2';
import SignupForm from './components/SignupForm/SignupForm';
import * as authService from '../src/services/authServices';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddCourse from './components/AddCourse/AddCourse';

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
						<Route path='/signout' element={<Landing />} />
						<Route path='/courses/add' element={<AddCourse />} />
						<Route path='/courses/:courseId/:lessonId' element={<LessonPage />} />
					</>
				) : (
					// Not Protected
					<>
						<Route path='/' element={<Landing setUser={setUser} />} />
						<Route path='/signup' element={<SignupForm setUser={setUser} />} />
					</>
				)}
			</Routes>
		</AuthedUserContext.Provider>
	);
};

export default App;
