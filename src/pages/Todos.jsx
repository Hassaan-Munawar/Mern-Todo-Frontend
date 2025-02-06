import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"
import { AppRoutes } from "../constant/AppRoutes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faTrash,
  faPencilAlt,
  faSave,
  faMoon,
  faSun,
  faSignOutAlt,
  faCheckCircle,
  faTasks,
  faUser,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons"

const Todos = () => {
  const { user, setUser } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [editText, setEditText] = useState("")
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = () => {
    setLoading(true)
    axios
      .get(AppRoutes.getTask, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => setTodos(res.data.data))
      .finally(() => setLoading(false))
  }

  const addTodo = () => {
    if (todo.trim().length < 4) return
    axios
      .post(
        AppRoutes.addTask,
        { todo },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      )
      .then(() => {
        setTodo("")
        getTodos()
      })
  }

  const handleDeleteTodo = (todoId) => {
    axios
      .delete(`${AppRoutes.deleteTask}/${todoId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(() => getTodos())
  }

  const handleEditTodo = (todoId, updatedTodo) => {
    axios
      .put(
        `${AppRoutes.updateTask}/${todoId}`,
        { todo: updatedTodo },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      )
      .then(() => getTodos())
  }

  const toggleTodoCompletion = (todoId, completed) => {
    axios
      .put(
        `${AppRoutes.updateComplete}/${todoId}`,
        { completed: completed == 'true' ? 'false' : 'true' },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      )
      .then(() => getTodos(), console.log("done"))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleSaveEdit = (todoId) => {
    if (editText.trim() === "") return
    handleEditTodo(todoId, editText)
    setEditingTodo(null)
    setEditText("")
  }

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return todo.completed == 'false'
      if (filter === "completed") return todo.completed == 'true'
      return true
    })
    .filter((todo) => todo.todo.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div
      className={`min-h-screen flex flex-col sm:flex-row ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
    >
      {/* Mobile Header */}
      <div className="sm:hidden flex justify-between items-center p-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold">Todo App</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "block" : "hidden"} sm:block w-full sm:w-64 p-6 ${darkMode ? "bg-gray-800" : "bg-white"} border-r ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <FontAwesomeIcon icon={faTasks} className="mr-2" />
          Todo App
        </h1>
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Welcome,</p>
          <p className="text-lg font-semibold flex items-center">
           <img src={user?.picture} className="mr-2 w-12 h-12 rounded-full" />
            {user?.fullName}
          </p>
        </div>
        <button
          onClick={() => {
            setUser(null)
            Cookies.set("token", null)
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out mb-4 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
        <button
          onClick={toggleDarkMode}
          className={`w-full py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="mr-2" />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Add Todo Input */}
          <div className={`mb-8 p-4 sm:p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New Todo
            </h2>
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Enter your todo"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className={`flex-grow px-4 py-2 rounded-lg sm:rounded-r-none focus:outline-none mb-2 sm:mb-0 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                }`}
              />
              <button
                onClick={addTodo}
                disabled={todo.trim().length < 2}
                className={`px-6 py-2 rounded-lg sm:rounded-l-none transition duration-300 ease-in-out flex items-center justify-center ${
                  todo.trim().length < 2
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className={`p-4 sm:p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FontAwesomeIcon icon={faTasks} className="mr-2" />
              Your Todos
            </h2>

            {/* Search and Filter */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none ${
                      darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded-lg transition duration-300 ease-in-out ${
                    filter === "all"
                      ? "bg-blue-500 text-white"
                      : darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-3 py-1 rounded-lg transition duration-300 ease-in-out ${
                    filter === "active"
                      ? "bg-blue-500 text-white"
                      : darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1 rounded-lg transition duration-300 ease-in-out ${
                    filter === "completed"
                      ? "bg-blue-500 text-white"
                      : darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredTodos.map((todoData) => (
                  <li
                    key={todoData._id}
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } transition duration-300 ease-in-out transform hover:scale-102 ${
                      todoData.completed=='true' ? "opacity-70" : ""
                    }`}
                  >
                    {editingTodo === todoData._id ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className={`flex-grow px-4 py-2 rounded-lg sm:rounded-r-none focus:outline-none ${
                            darkMode ? "bg-gray-600 text-white" : "bg-white text-gray-800"
                          }`}
                        />
                        <button
                          onClick={() => handleSaveEdit(todoData._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg sm:rounded-l-none transition duration-300 ease-in-out flex items-center justify-center"
                        >
                          <FontAwesomeIcon icon={faSave} className="mr-2" />
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center flex-grow">
                          <button
                            onClick={() => toggleTodoCompletion(todoData._id, todoData.completed)}
                            className={`mr-3 text-xl ${todoData.completed=='true' ? "text-green-500" : "text-gray-400"}`}
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </button>
                          <span className={`flex-grow text-lg ${todoData.completed == 'true' ? "line-through" : ""}`}>
                            {todoData.todo}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingTodo(todoData._id)
                              setEditText(todoData.todo)
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out flex items-center"
                          >
                            <FontAwesomeIcon icon={faPencilAlt} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTodo(todoData._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out flex items-center"
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {!loading && filteredTodos.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No todos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todos

