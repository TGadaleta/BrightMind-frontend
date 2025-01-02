import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as coursesServices from '../../services/coursesServices.js';
import styles from './Lesson2.module.css';

const Lesson2 = ({ user }) => {
	const { userId, courseId, lessonId } = useParams();

	const [lesson, setLesson] = useState(null);

	useEffect(() => {
		if (!userId || !courseId || !lessonId) {
			console.error('Missing parameters: userId, courseId, or lessonId');
			return;
		}
		const fetchLesson = async () => {
			console.log('Parameters:', { userId, courseId, lessonId });

			try {
				const lessonData = await coursesServices.showLesson(
					userId,
					courseId,
					lessonId
				);

				if (lessonData) {
					setLesson(lessonData);
				}
			} catch (error) {
				console.error('Error fetching lesson:', error);
			}
			
		fetchLesson();
	}, [userId, courseId, lessonId]);

	const [loading, setLoading] = useState(true);

	if (loading) return <p className='loading'>Loading lesson...</p>;
	if (!lesson) return <p className='error'>Failed to load lesson</p>;

	return (
		<main className={styles.container}>
			<h1 className={styles.lessonName}>
				{lesson.name || 'No lesson name available'}
			</h1>
			<p>{lesson.text || 'No content available for this lesson.'}</p>

			{lesson.course && (
				<>
					<h2>Course Name: {lesson.course.name}</h2>
					<h3>Department: {lesson.course.department}</h3>
					<p>{lesson.course.description}</p>

					{lesson.course.lessons && lesson.course.lessons.length > 0 && (
						<div className={styles.lessonsContainer}>
							<h2>Lessons</h2>
							<div className={styles.lessonList}>
								{lesson.course.lessons.map((lessonItem) => (
									<div key={lessonItem._id} className={styles.lessonCard}>
										<p>
											<strong>Name:</strong> {lessonItem.name || 'N/A'}
										</p>
										<p>
											<strong>Description:</strong> {lessonItem.text || 'TBA'}
										</p>
										<Link to={`/courses/lessons/${lessonItem._id}`}>
											View Lesson
										</Link>
									</div>
								))}
							</div>
						</div>
					)}
				</>
			)}

			<div className={styles.navTabs}>
				<Link to='../Courses'>
					<button className={styles.backButton}>Back</button>
				</Link>
			</div>
		</main>
	);
};

export default Lesson2;
