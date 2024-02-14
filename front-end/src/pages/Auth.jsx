import { Navigate, useLocation, Route, } from "react-router-dom";
import React, { useEffect } from 'react';


export const setToken = (token) => {
    localStorage.setItem('rasyueToken', token)
}
export const getToken = (token) => {
    return localStorage.getItem('rasyueToken')
}

export const setID = (userid) => {
    localStorage.setItem('userid', userid)
}

// export const getID = (userid) => {
//     return localStorage.getItem('userid', userid)
// }

export const setAdmin = (admin) => {
    localStorage.setItem('admin', admin)
}