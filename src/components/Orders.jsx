import React from 'react';
import dummyData from '../constants/DummyData.json';
import Order from './Order'; // Assuming Order component exists in './Order' file

const Orders = () => {
    return (
        <div className='flex flex-row flex-wrap gap-10 p-2'>
            {/* Render your orders here */}
            {dummyData.map((order, index) => (
                <div key={order.id}>
                    <Order
                        id={order.id}
                        order={order}
                    />
                </div>
            ))}
        </div>
    );
};

export default Orders;
