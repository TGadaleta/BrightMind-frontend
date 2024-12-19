import React, { useState } from 'react';
import styles from './SignupForm.module.css';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConf, setPasswordConf] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// Validation function to check if passwords match
	const isFormValid = () => {
		return username && email && password && password === passwordConf;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if passwords match
		if (password !== passwordConf) {
			setErrorMessage('Passwords do not match');
			return;
		}

		setErrorMessage('');

		// Log the form data
		console.log('Username:', username);
		console.log('Email:', email);
		console.log('Password:', password);

		// Reset form after successful submit (optional)
		setUsername('');
		setEmail('');
		setPassword('');
		setPasswordConf('');
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.title}>Sign Up</h1>

				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label htmlFor='username' className={styles.label}>
							Username
						</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className={styles.input}
							placeholder='Enter your username'
							required
						/>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor='email' className={styles.label}>
							Email
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
							className={styles.input}
							placeholder='Enter your password'
							required
						/>
					</div>

					{/* Confirm Password field */}
					<div className={styles.inputGroup}>
						<label htmlFor='confirmPassword' className={styles.label}>
							Confirm Password
						</label>
						<input
							type='password'
							id='confirmPassword'
							value={passwordConf}
							onChange={(e) => setPasswordConf(e.target.value)}
							className={styles.input}
							placeholder='Confirm your password'
							required
						/>
					</div>

					{/* Error message */}
					{errorMessage && (
						<div className={styles.errorMessage}>
							<p>{errorMessage}</p>
						</div>
					)}

					{/* Submit button */}
					<div className={styles.buttons}>
						<button
							type='submit'
							className={styles.signUpBtn}
							disabled={!isFormValid()} // Disable if form is invalid
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
