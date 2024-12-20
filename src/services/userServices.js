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

const updateTodos = async (userId, todoId, updatedTodo) => {
    try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/${userId}/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        });
        return res.json()
    } catch (error) {
        console.log(error)
    }
}
export { indexCourses, indexTodos, updateTodos }