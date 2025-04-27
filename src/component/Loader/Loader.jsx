import React from 'react'
import { Circles } from 'react-loader-spinner'

function Loader() {
    return <>
        <div className='d-flex flex-wrap justify-content-center align-content-center min-vh-100'>
            <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </div>
    </>
}

export default Loader
