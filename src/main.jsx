import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId =  '708359627235-a89kjqpccghbun2i6p3febc10mpq0nao.apps.googleusercontent.com' 
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </GoogleOAuthProvider>,
)
