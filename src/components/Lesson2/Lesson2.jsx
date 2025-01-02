import styles from './Lesson2.module.css';
import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from "../../App";
import { Link, useParams } from 'react-router-dom';
import * as userServices from '../../services/userServices.js';

const Lesson2 = () => {
	const currentUser = useContext(AuthedUserContext);
	const userId = currentUser._id;
	const { courseId, lessonId } = useParams();
	const [lesson, setLesson] = useState();

	useEffect(() => {
		if (!userId || !courseId || !lessonId) {
			console.error('Missing parameters: userId, courseId, or lessonId');
			return;
		}

		const fetchLesson = async () => {
			try {
				const lessonData = await userServices.indexLesson(
					userId,
					courseId,
					lessonId
				);
				console.log(lessonData)
				if (lessonData) {
					setLesson(lessonData);
				}
			} catch (error) {
				console.error('Error fetching lesson:', error);
			}
		};
		fetchLesson();
	}, [userId, courseId, lessonId]);

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
