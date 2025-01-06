import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';
import * as authService from '../../services/authServices.js';

const Landing = (props) => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await authService.signin(formData);
			props.setUser(user);
			navigate('/');
		} catch (err) {
			setError(err);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className='welcome'>
				Welcome
				<br />
				to
				<br />
				<em>Brightmind</em>
			</h1>
			<div className={styles.formContainer}>
				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label htmlFor='username' className={styles.label}>
							Username
						</label>
						<input
							type='text'
							id='username'
							name='username'
							value={formData.username}
							onChange={handleChange}
							className={styles.input}
							placeholder='Enter your username'
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='password' className={styles.label}>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className={styles.input}
							placeholder='Enter your password'
							required
						/>
					</div>
					<div className={styles.buttons}>
						<button type='submit' className={styles.signInBtn}>
							Sign In
						</button>
						<button
							type='button'
							className={styles.signUpBtn}
							onClick={() => navigate('/signup')}
						>
							Sign Up
						</button>
					</div>
				</form>
				{error && <div className='error'>{error.message}</div>}
			</div>
		</div>
	);
};

export default Landing;
