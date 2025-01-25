

const dev = 'http://localhost:4000/'
const prod = 'https://final-hackathon-lac.vercel.app/'


const BASE_URL = prod


export const AppRoutes = {
    login: BASE_URL + "user/login",
    register: BASE_URL + "user/register",
    google: BASE_URL + "user/google",
    addTask: BASE_URL + "todos",
    getTask: BASE_URL + "todos",
    updateTask: BASE_URL + "todos",
    deleteTask: BASE_URL + "todos",
    myInfo: BASE_URL + "userinfo",
}