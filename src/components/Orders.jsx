import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, removeOrder } from '../features/OrderSlice';

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders);
    const ordersArray = Object.values(orders);

    const [EditForm, setEditForm] = useState(false);
    const [FormData, setFormData] = useState({
        id: '',
        customer_name: '',
        customer_email: '',
        product: '',
        quantity: ''
    });
    const [errors, setErrors] = useState({
        id: '',
        customer_name: '',
        customer_email: '',
        product: '',
        quantity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Validate individual field and update errors
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: validateField(name, value)
        }));
    }

    const validateField = (name, value) => {
        // Custom validation logic for each field
        switch (name) {
            case 'id':
                return value.trim() === '' ? 'ID is required' : '';
            case 'customer_name':
                return value.trim().length < 3 ? 'Customer Name is required (minimum 3 characters)' : '';
            case 'customer_email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
            case 'product':
                // Check if value is one of the allowed options
                return ['Product 1', 'Product 2', 'Product 3'].includes(value) ? '' : 'Invalid product selection';
            case 'quantity':
                return isNaN(value) || value < 1 ? 'Quantity must be at least one' : '';
            default:
                return '';
        }
    };

    const validateForm = () => {
        // Validate all fields and update errors
        const newErrors = {};
        let isValid = true;
        for (const field in FormData) {
            const error = validateField(field, FormData[field]);
            newErrors[field] = error;
            if (error) {
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleEditOrder = (order) => {
        setEditForm(prevState => !prevState);
        setFormData(order);
        console.log(order);
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (validateForm()) {
            dispatch(removeOrder(FormData));
            dispatch(addOrder(FormData));
            setFormData({ id: '', customer_name: '', customer_email: '', product: '', quantity: '' });
            setEditForm(false);
        }
    }

    return (
        <div className='p-2 w-full'>
            <div className='text-sm font-bold opacity-40 my-4'>Total Orders: {ordersArray[0].length}</div>
            <div className="flex gap-2">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        {/* Table header */}
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Sno
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersArray[0].map((order, index) => (
                                <tr key={order.id} class="odd:bg-white even:bg-gray-50">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrape">
                                        {index + 1}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrape">
                                        {order.customer_name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {order.customer_email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.product}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.quantity}
                                    </td>
                                    <td class="px-6 py-4 flex gap-3">
                                        <div onClick={() => handleEditOrder(order)} class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</div>
                                        <div onClick={() => dispatch(removeOrder(order))} class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={`${EditForm ? "" : "hidden"}`}>
                    <div className='my-2 w-full '>
                        <div className=' flex rounded-xl my-2' onSubmit={handleEditFormSubmit}>
                            <form action="" className='flex flex-col gap-2 w-full' >
                                <input type="text" required={true} name="id" value={FormData.id} onChange={handleChange} placeholder='Enter ID' className='border p-2 rounded-xl outline-none text-sm' />
                                {errors.id && <span className="text-red-500 text-xs">{errors.id}</span>}
                                <input type="text" required={true} name="customer_name" value={FormData.customer_name} onChange={handleChange} placeholder='Enter Customer Name' className='border p-2 rounded-xl outline-none text-sm' />
                                {errors.customer_name && <span className="text-red-500 text-xs">{errors.customer_name}</span>}
                                <input type="email" required={true} name="customer_email" value={FormData.customer_email} onChange={handleChange} placeholder='Enter Customer Email' className='border p-2 rounded-xl outline-none text-sm' />
                                {errors.customer_email && <span className="text-red-500 text-xs">{errors.customer_email}</span>}
                                {/* Changed to select input */}
                                <select required={true} name="product" value={FormData.product} onChange={handleChange} className='border p-2 rounded-xl outline-none text-sm'>
                                    <option value="">Select Product</option>
                                    <option value="Product 1">Product 1</option>
                                    <option value="Product 2">Product 2</option>
                                    <option value="Product 3">Product 3</option>
                                </select>
                                {errors.product && <span className="text-red-500 text-xs">{errors.product}</span>}
                                <input type="number" required={true} name="quantity" value={FormData.quantity} onChange={handleChange} placeholder='Enter Product Quantity' className='border p-2 rounded-xl outline-none text-sm' />
                                {errors.quantity && <span className="text-red-500 text-xs">{errors.quantity}</span>}
                                <button className='text-white p-2'>Update Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Orders;
