import React from 'react';
import { AuthedUserContext } from '../../App';
import styles from './AddLesson.module.css';
import * as courseServices from '../../services/coursesServices.js';
import { useNavigate, useParams } from 'react-router-dom';

const AddLesson = () => {
  const user = React.useContext(AuthedUserContext);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null)
  const [formData, setFormData] = React.useState({
    name: '',
    text: '',
    owner: user._id,
  });

  const handleBack = (e) => {
    navigate(`/courses/${courseId}`)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'description') {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null)
      const res = await courseServices.addLesson(courseId,formData);
      if (res._id) {
        navigate(`/courses/${courseId}`);
      } else {
        setError(res.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { name, text } = formData;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className="bm">Bright Mind</h1>
        <h2 className="addLesson">Add Lesson</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="lessonName" className={styles.label}>
              Lesson Name
            </label>
            <input
              type="text"
              id="lessonName"
              value={name}
              name="name"
              onChange={handleChange}
              className={styles.input}
              placeholder="Name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="text" className={styles.label}>
              Lesson Text
            </label>
            <textarea
              id="text"
              name="text"
              className={styles.text}
              value={text}
              onChange={handleChange}
              placeholder="Enter the lesson text..."
              required
            />
          </div>
          {error &&
          <div>{error}</div>}
          <button type="submit" className={styles.addLessonBtn}>
            Add Lesson
          </button>
        </form>
        <button type='button' onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default AddLesson;
