import React, { useState } from 'react';
import styles from './Landing.module.css';

const Landing = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Username:', username);
		console.log('Password:', password);
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
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
							placeholder='Enter your usernames'
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
					<div className={styles.buttons}>
						<button type='submit' className={styles.signInBtn}>
							Sign In
						</button>
						<button type='button' className={styles.signUpBtn}>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Landing;
