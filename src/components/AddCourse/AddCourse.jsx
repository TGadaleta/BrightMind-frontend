import React from 'react';
import { AuthedUserContext } from '../../App';
import styles from './AddCourse.module.css';

const AddCourse = () => {
  const user = React.useContext(AuthedUserContext);
  const [error, setError] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    department: '',
    description: '',
  });

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
    
  };

  const { name, department, description } = formData;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className="bm">Bright Mind</h1>
        <h1 className="addCourse">Add Course</h1>

        <form onSubmit={handleSubmit}>
          {/* Course Name */}
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
            {error && <div className="error"> {error.message}</div>}
          </div>

          {/* Course Department */}
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

          {/* Course Description */}
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
      </div>
    </div>
  );
};

export default AddCourse;
