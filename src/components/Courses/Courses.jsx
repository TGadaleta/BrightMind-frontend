import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Courses.module.css';

const Courses = (props) => {
	return (
		<>
			<h2>LESSON TITLE</h2>

			<main className={styles.container}>
				{props.courses.map((course) => (
					<Link key={course._id} to={`/course/${course._id}`}>
						<section>
							<h2>{course.name}</h2>
							<h3>{course.department}</h3>
							<p>{course.description}</p>
						</section>
					</Link>
				))}
			</main>
		</>
	);
};

export default Courses;
