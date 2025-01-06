import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';
import * as authService from '../../services/authServices.js';

const SignupForm = (props) => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		passwordConf: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError(null);
	};

	const isFormValid = () => {
		const { username, password, passwordConf } = formData;
		return username && password && password === passwordConf;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newUserResponse = await authService.signup(formData);

			props.setUser(newUserResponse.user);
			navigate('/');
		} catch (err) {
			setError(err);
		}
	};

	const { username, email, password, passwordConf } = formData;

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className='bm'>Bright Mind</h1>
				<h1 className='sign'>Sign-up</h1>

				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label htmlFor='username' className={styles.label}>
							Username
						</label>
						<input
							type='text'
							id='username'
							value={username}
							name='username'
							onChange={handleChange}
							className={styles.input}
							placeholder='Enter your username'
							required
						/>
						{error && <div className='error'>{error.message}</div>}
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor='email' className={styles.label}>
							Email
						</label>
						<input
							type='email'
							id='email'
							value={email}
							name='email'
							onChange={handleChange}
							className={styles.input}
							placeholder='Enter your email'
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
							value={password}
							name='password'
							onChange={handleChange}
							className={styles.input}
							placeholder='Enter your password'
							required
						/>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor='confirmPassword' className={styles.label}>
							Confirm Password
						</label>
						<input
							type='password'
							id='confirmPassword'
							value={passwordConf}
							name='passwordConf'
							onChange={handleChange}
							className={styles.input}
							placeholder='Confirm your password'
							required
						/>
					</div>

					<div className={styles.buttons}>
						<button
							disabled={!isFormValid()}
							type='submit'
							className={styles.signUpBtn}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
