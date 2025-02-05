

const dev = 'http://localhost:4000/'
const prod = 'https://mern-todo-backend-gules.vercel.app/'


const BASE_URL = prod


export const AppRoutes = {
    login: BASE_URL + "user/login",
    register: BASE_URL + "user/register",
    google: BASE_URL + "user/google",
    addTask: BASE_URL + "todos",
    getTask: BASE_URL + "todos",
    updateTask: BASE_URL + "todos",
    updateComplete: BASE_URL + "todos/updateComplete",
    deleteTask: BASE_URL + "todos",
    myInfo: BASE_URL + "userinfo",
}