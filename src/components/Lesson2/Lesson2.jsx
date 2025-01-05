import styles from './Lesson2.module.css';
import { AuthedUserContext } from "../../App";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
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
			<div className={styles.navTabs}>
				<Link to={`/courses/${lesson.course}`}>
					<button className={styles.backButton}>Back</button>
				</Link>
			</div>
		</main>
	);
};

export default Lesson2;
