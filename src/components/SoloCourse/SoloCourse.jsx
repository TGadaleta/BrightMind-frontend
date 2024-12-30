import styles from './SoloCourse.module.css';
import { AuthedUserContext } from "../../App";
import { useParams, Link } from 'react-router-dom';
import * as userServices from '../../services/userServices'
import React, { useState, useEffect, useContext } from 'react';
import * as coursesServices from '../../services/coursesServices';

const SoloCourse = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState([]);
	const currentUser = useContext(AuthedUserContext);
	const userId = currentUser._id; 

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

	const joinCourse = async () => {
		try {
			currentUser.courses = await userServices.userCourses(userId)
			const currentUserCourses = currentUser.courses.map(course => course._id)
			if (currentUserCourses.includes(courseId)){
				throw new Error("You already are in this course")
			}
			const joinedCourse = await userServices.joinCourse(userId, courseId)
		} catch (error) {
			console.error(error)
		}
	}

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
								{currentUser &&
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
						<button type='button' onClick={joinCourse} className={styles.joinBtn}>
							Join
						</button>
					</div>
				</div>
			) : (
				<p>No lessons available for this course.</p>
			)}
		</main>
	);
};

export default SoloCourse;
