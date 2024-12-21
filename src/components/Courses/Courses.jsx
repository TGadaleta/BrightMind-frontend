import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Courses.module.css';
import * as coursesServices from '../../services/coursesServices.js';

const Courses = () => {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
			const coursesData = await coursesServices.index();
			setCourses(coursesData);
		};
		fetchCourses();
	}, []);
	console.log(courses);
	return (
		<>
			<h2>COURSES</h2>

			<main className={styles.container}>
				{courses.map((course) => (
					<Link key={course._id} to={`/courses/${course._id}`}>
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
