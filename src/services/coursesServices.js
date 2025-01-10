const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/courses`;

const index = async () => {
	try {
		const res = await fetch(BASE_URL);
		return res.json();
	} catch (error) {
		console.error(error);
	}
};

const showCourse = async (courseId) => {
	try {
		const res = await fetch(`${BASE_URL}/${courseId}`);
		return res.json();
	} catch (error) {
		console.error(error);
	}
};


const addCourse = async (courseFormData) => { 
	try {
		const token = localStorage.getItem('token');
		const res = await fetch(`${BASE_URL}/add`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(courseFormData)
		});
		return res.json();
	} catch (error) {
		console.error(error)
		throw error
	}
}

const addLesson = async (courseId, lessonFormData) => {
	try {
		const token = localStorage.getItem('token');
		const res = await fetch(`${BASE_URL}/${courseId}/add`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(lessonFormData)
		});
		return res.json()
	} catch (error) {
		console.error(error)
		throw error
	}
}

export { index, showCourse, addCourse, addLesson };
