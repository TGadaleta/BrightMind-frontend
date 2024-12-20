const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users`;

const indexCourses = async (userId) => {
    try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/${userId}/courses`, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        return res.json()
    }
    catch (error) {
        console.error(error)
    }
}

const indexTodos = async (userId) => {
    try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/${userId}/todos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.json()
    } catch (error) {
        console.error(error)
    }
}

export { indexCourses, indexTodos }