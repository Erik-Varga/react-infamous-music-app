import React, { useEffect, useState } from 'react'
import { BsSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';

const LightDark = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme === "dark") {
            setDarkMode(true)
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode]);

  return (
    <div 
        className='relative w-14 h-7 flex items-center dark:bg-gray-900 bg-teal-500 cursor pointer rounded-full p-1' 
        onClick={() => setDarkMode(!darkMode)}
    >    
        <FaMoon className="text-white" size={16} />
        <div 
            className='absolute bg-white dark:bg-gray-600 w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 cursor-pointer'
            style={darkMode ? {left: "3px" } : { right: "3px"}}
            title={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
            ></div>

        <BsSunFill className='ml-auto text-yellow-400' size={18} />

    </div>
  )
}

export default LightDark