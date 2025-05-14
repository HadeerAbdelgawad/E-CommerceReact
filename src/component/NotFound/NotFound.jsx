import React from 'react'

function NotFound() {
    return <>
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-8xl text-red-600'>ERROR 404!</h1>
           <div className='flex flex-row items-center'>
                <span >
                <i class="fa-solid fa-triangle-exclamation fa-beat text-blue-700 text-9xl"></i>
                </span>
            <p className='font-bold text-2xl text-gray-700'>Page Not Found !</p></div>
        </div>
    </>
}

export default NotFound
