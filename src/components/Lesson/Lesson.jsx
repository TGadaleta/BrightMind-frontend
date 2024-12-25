import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Lesson.module.css';

const Lesson = () => {
	return (
		<>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.courseName}>Course Name</div>
					<div className={styles.navTabs}>
						<Link to='../Courses'>
							<button className={styles.homeButton}>Home</button>
						</Link>
						{/* <button>Assessment</button> */}
					</div>
				</header>

				<div className={styles.lessonContainer}>
					<div className={styles.lessonName}>
						Lesson 1: Introduction to React
					</div>
					<div className={styles.lessonName}>
						Lesson 2: Understanding Components
					</div>
					<div className={styles.lessonName}>Lesson 3: JSX and Rendering</div>
				</div>
			</div>
		</>
	);
};

export default Lesson;
