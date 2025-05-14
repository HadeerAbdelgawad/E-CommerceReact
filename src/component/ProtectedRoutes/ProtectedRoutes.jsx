import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes(props) {
    if(localStorage.getItem('UserToken')!==null){
        return props.children
    }else{
        return<Navigate to={'/login'}/>
    }
    return <>

    </>
}

export default ProtectedRoutes
