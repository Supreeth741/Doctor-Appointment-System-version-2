import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
  setIsLoggedIn(true);
  setUsername(user.name);
  }
  else{
    setIsLoggedIn(false);
    setUsername('');
  }
},[]);

  return (
    <div>
       <nav className="bg-gray-800 flex items-center justify-between px-1 py-2">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-white text-xl font-bold mr-2 cursor-pointer hover:text-gray-200" 
          onClick={() =>{
            navigate("/");
          }}
        >DAS</span>
        <span className="text-gray-400 text-sm">Doctor Appointment System</span>
      </div>

      {/* Links (hidden on small screens) */}
      <ul className="hidden lg:flex space-x-4 text-white grid place-content-center ">
        <li>
          <a href="/" className="hover:text-gray-200">Home</a>
        </li>
        <li>
          <a href="#about" className="hover:text-gray-200">About</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-gray-200">Contact</a>
        </li>
      </ul>

      {/* User Actions (responsive layout) */}
      <div className="flex items-center space-x-2">
        {!isLoggedIn && (
          <button
            onClick={() => {
              navigate('/signin')
            }} // Replace with login logic
            className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-700 rounded"
          >
            SIGN IN
          </button>
        )}
        {isLoggedIn && (
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm cursor-pointer" 
              onClick={() =>{
                if (user.role === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >{`Welcome, ${username}`}</span>
            <button
              onClick={()=>{
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                navigate("/");
              }}
              className="px-3 py-1 text-white bg-gray-600 hover:bg-gray-700 rounded"
            >
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </nav>

    </div>
  )
}

export default Header