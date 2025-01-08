import { Link, useNavigate } from 'react-router-dom';
import styles from './Courses.module.css';
import { AuthedUserContext } from "../../App";
import { useEffect, useState, useContext } from 'react';
import * as coursesServices from '../../services/coursesServices.js';

const Courses = () => {
	const [courses, setCourses] = useState([]);
	const currentUser = useContext(AuthedUserContext)
	const navigate = useNavigate();

	const handleAddCourse = () => {
		navigate('/courses/add')
	}

	useEffect(() => {
		const fetchCourses = async () => {
			const coursesData = await coursesServices.index();
			setCourses(coursesData);
		};
		fetchCourses();
	}, []);
	return (
		<>
			<h2>COURSES</h2>
			{currentUser &&
			<button type='button' onClick={handleAddCourse}>Add Course</button>}
			<main className={styles.container}>
				{courses.map((course) => (
					<div key={course._id}>
						{currentUser ? (
							<Link to={`/courses/${course._id}`}>
								<section>
									<h2>{course.name}</h2>
									<h3>{course.department}</h3>
									<p>{course.description}</p>
								</section>
							</Link>
						) : (
							<section className={styles.disabledLink}>
								<h2>{course.name}</h2>
								<h3>{course.department}</h3>
								<p>{course.description}</p>
							</section>
						)}
					</div>
				))}
			</main>
		</>
	);
};

export default Courses;
