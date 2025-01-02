import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as coursesServices from '../../services/coursesServices';
import styles from './SoloCourse.module.css';

const SoloCourse = ({ user }) => {
	const { courseId } = useParams();
	const [course, setCourse] = useState([]);

	useEffect(() => {
		const fetchSoloCourse = async () => {
			try {
				const soloCourse = await coursesServices.showCourse(courseId);
				setCourse(soloCourse);
			} catch (error) {
				console.error('Error fetching course:', error);
			}
		};
		fetchSoloCourse();
	}, [courseId]);

	if (!course) return <p>Loading course...</p>;

	return (
		<main className={styles.container}>
			<h1 className={styles.courseName}>{course.name}</h1>
			<h2>Department: {course.department}</h2>
			<p>{course.description}</p>

			{course.lessons && course.lessons.length > 0 ? (
				<div className={styles.lessonsContainer}>
					<h2>Lessons</h2>
					<div className={styles.lessonList}>
						{course.lessons.map((lesson) => (
							<div key={lesson._id} className={styles.lessonCard}>
								<p>
									<strong>Title:</strong> {lesson.name || 'N/A'}
								</p>
								<p>
									<strong>Description:</strong> {lesson.text || 'TBA'}
								</p>

								{/* Authorized Users */}
								{user &&
									course.username &&
									course.username._id === user._id && (
										<Link to={`/courses/${courseId}/lessons/${lesson._id}`}>
											View Lesson
										</Link>
									)}
							</div>
						))}
					</div>
					<div className={styles.topRightButton}>
						<Link to='../Courses/lesson2/12345'>
							<button type='submit' className={styles.joinBtn}>
								Join
							</button>
						</Link>
					</div>
				</div>
			) : (
				<p>No lessons available for this course.</p>
			)}
		</main>
	);
};

export default SoloCourse;
