import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../features/OrderSlice.js';

const AddOrder = () => {
  const dispatch = useDispatch();
  const [Form, setForm] = useState(false);
  const [FormData, setFormData] = useState({
    id: '',
    customer_name: '',
    customer_email: '',
    product: '', // Changed to string instead of number
    quantity: ''
  });

  // State variables for form error handling
  const [errors, setErrors] = useState({
    id: '',
    customer_name: '',
    customer_email: '',
    product: '',
    quantity: ''
  });

  const addOrderHandler = (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (validateForm()) {
      setForm(false);
      dispatch(addOrder(FormData));
      setFormData({
        id: '',
        customer_name: '',
        customer_email: '',
        product: '',
        quantity: ''
      });
      // Clear errors after successful submission
      setErrors({
        id: '',
        customer_name: '',
        customer_email: '',
        product: '',
        quantity: ''
      });
    }
  };

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
  };

  const validateField = (name, value) => {
    // Custom validation logic for each field
    switch (name) {
      case 'id':
        return value.trim() === '' ? 'ID is required' : '';
      case 'customer_name':
        return value.trim() === '' ? 'Customer Name is required' : '';
      case 'customer_email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'product':
        // Check if value is one of the allowed options
        return ['Product 1', 'Product 2', 'Product 3'].includes(value) ? '' : 'Invalid product selection';
      case 'quantity':
        return isNaN(value) || value < 1 ? 'Quantity must be be at least one' : '';
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

  return (
    <div className='my-2 w-full'>
      <button onClick={() => setForm(prevValue => !prevValue)} className='w-full'>{Form ? "Cancel" : "+ Add Order"}</button>

      <div className={`${Form ? '' : 'hidden'} flex rounded-xl my-2`}>
        <form action="" className='flex flex-col gap-2 w-full' onSubmit={addOrderHandler}>
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
          <button className='text-white p-2'>Add Order</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
