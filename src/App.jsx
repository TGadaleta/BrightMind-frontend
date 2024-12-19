import { useState } from 'react';

// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import React from 'react';
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
		<>
			<div>
				<h1>
					Welcome <br></br>to <br></br>
					<em>Brightmind</em>
				</h1>
				<div>
					<Landing />
				</div>

				{/* <a href='https://vite.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a> */}
				{/* <a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a> */}
			</div>
			{/* <h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div> */}
			{/* <p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p> */}
		</>
	);
}

export default App;
