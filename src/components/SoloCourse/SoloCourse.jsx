import styles from './SoloCourse.module.css';
import { AuthedUserContext } from '../../App';
import { useParams, Link } from 'react-router-dom';
import * as userServices from '../../services/userServices';
import { useState, useEffect, useContext } from 'react';
import * as coursesServices from '../../services/coursesServices';

const SoloCourse = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState([]);
	const [isJoined, setIsJoined] = useState(false);
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

		const checkIfJoined = async () => {
			try {
				// Fetch user's enrolled courses
				const userCourses = await userServices.userCourses(userId);

				// Extract course IDs from the user's courses
				const userCourseIds = userCourses.map((course) => course._id);

				// Check if the current courseId exists in the user's enrolled course IDs
				setIsJoined(userCourseIds.includes(courseId));
			} catch (error) {
				console.error('Error checking course enrollment:', error);
			}
		};

		fetchSoloCourse();
		checkIfJoined();
	}, [courseId, userId]);

	if (!course) return <p>Loading course...</p>;

	const joinCourse = async () => {
		try {
			await userServices.joinCourse(userId, courseId);
			setIsJoined(true);
		} catch (error) {
			console.error('Error joining course:', error);
		}
	};

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

								{currentUser &&
									course.username &&
									course.username._id === currentUser._id && (
										<Link to={`/courses/${courseId}/lessons/${lesson._id}`}>
											View Lesson
										</Link>
									)}
							</div>
						))}
					</div>
					<div className={styles.topRightButton}>
						{!isJoined && (
							<button
								type='button'
								onClick={joinCourse}
								className={styles.joinBtn}
							>
								Join
							</button>
						)}
					</div>
				</div>
			) : (
				<p>No lessons available for this course.</p>
			)}
		</main>
	);
};

export default SoloCourse;
