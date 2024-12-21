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

export { index, showCourse };
