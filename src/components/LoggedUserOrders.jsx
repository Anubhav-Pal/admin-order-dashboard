import React from 'react'
import LogoutButton from './Auth/logout';
import Profile from './Auth/profile';
import Orders from './Orders';

const LoggedUserOrders = () => {
    return (
        <div className='flex justify-start'>
            <div className='flex flex-col items-center '>
                <Profile />
                <LogoutButton />
            </div>
            <div>
                <Orders />
            </div>
        </div>
    )
}

export default LoggedUserOrders