import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'

const Login = () => {
    const {isAuth , toggleAuth} = useContext(AuthContext)
    console.log(isAuth, toggleAuth);
    if(isAuth){
      return <Navigate to="/"/>
    }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={toggleAuth}>LogIn</button>
    </div>
  )
}

export default Login
