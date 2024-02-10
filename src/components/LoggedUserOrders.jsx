import React from 'react'
import LogoutButton from './Auth/logout';
import Profile from './Auth/profile';
import Orders from './Orders';
import AddOrder from './AddOrder';

const LoggedUserOrders = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-start w-full'>
            <div className='flex flex-col items-center w-full sm:w-1/5 p-4 '>
                <Profile />
                <LogoutButton />
                <AddOrder />

                <div className='mt-5 text-sm font-light underline'><a href="https://www.linkedin.com/in/anubhavpal/">by Anubhav Pal</a></div>
            </div>
            <div className='w-full'>
                <Orders />
            </div>
        </div>
    )
}

export default LoggedUserOrders