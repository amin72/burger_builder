import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions'


const Logout = (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(logout())
    })

    return (
        <Redirect to='/' />
    )
}

export default Logout