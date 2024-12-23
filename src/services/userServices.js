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

const createTodo = async (userId, todoFormData) => {
    try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/${userId}/todos`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoFormData),
        })
        return res.json
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

const deleteTodo = async (userId, todoId) => {
    const token = localStorage.getItem("token");
  
    const res = await fetch(`${BASE_URL}/${userId}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to delete todo with ID ${todoId}`);
    }
  
    return await res.json();
  };
export { indexCourses, indexTodos, updateTodos, createTodo, deleteTodo }