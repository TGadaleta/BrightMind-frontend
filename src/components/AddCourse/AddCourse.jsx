import React from 'react';
import { AuthedUserContext } from '../../App';
import styles from './AddCourse.module.css';
import * as courseServices from '../../services/coursesServices.js';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const user = React.useContext(AuthedUserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    department: '',
    description: '',
    owner: user._id,
  });

  const handleBack = (e) => {
    navigate('/courses')
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
      const res = await courseServices.addCourse(formData);
      if (res.status === 200) {
        setFormData({
          name: '',
          department: '',
          description: '',
        });
        navigate(`/courses`);
      } else {
        console.error('Error adding course:', res.message);
        alert(res.message || 'Failed to add course. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { name, department, description } = formData;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className="bm">Bright Mind</h1>
        <h2 className="addCourse">Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="courseName" className={styles.label}>
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              value={name}
              name="name"
              onChange={handleChange}
              className={styles.input}
              placeholder="Name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="courseDepartment" className={styles.label}>
              Course Department
            </label>
            <input
              type="text"
              id="courseDepartment"
              value={department}
              name="department"
              onChange={handleChange}
              className={styles.input}
              placeholder="Department"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="courseDescription" className={styles.label}>
              Course Description
            </label>
            <textarea
              id="courseDescription"
              name="description"
              className={styles.description}
              value={description}
              onChange={handleChange}
              placeholder="Enter the course description..."
              style={{
                minHeight: '100px',
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                resize: 'none',
                overflow: 'hidden',
              }}
              required
            />
          </div>
          <button type="submit" className={styles.addCourseBtn}>
            Add Course
          </button>
        </form>
        <button type='button' onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default AddCourse;
