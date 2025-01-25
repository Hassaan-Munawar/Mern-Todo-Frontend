import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId =  '190112895193-8c0jttrjgq0mo3kfsppqqg4ru0kohmtf.apps.googleusercontent.com' 
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </GoogleOAuthProvider>,
)
