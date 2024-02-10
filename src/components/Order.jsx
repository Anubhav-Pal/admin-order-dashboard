import React from 'react'

const Order = ({ id, order }) => {
    return (
        <div className='w-full flex flex-col p-4 rounded-lg shadow-xl gap-3'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <div className='text-xl font-bold'>{order.customer_name}</div>
                    <div className='text-sm text-gray-700 font-medium'>{order.customer_email}</div>
                </div>
                <div className='text-sm font-light flex flex-col'>
                    <div>Product: {order.product}</div>
                    <div>Quantity: {order.quantity}</div>
                </div>
            </div>
            <div className='w-full gap-1 flex items-center  justify-between'>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Order