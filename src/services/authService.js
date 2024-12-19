const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/Brightmind`;

// GET
const index = async () => {
	try {
		const response = await fetch(BASE_URL);
		return response.json();
	} catch (error) {
		console.error(error);
	}
};

export { index };
