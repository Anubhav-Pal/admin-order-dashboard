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
    product: '',
    quantity: ''
  });

  const addOrderHandler = (e) => {
    e.preventDefault();
    setForm(false);
    dispatch(addOrder(FormData));
    setFormData({
      id: '',
      customer_name: '',
      customer_email: '',
      product: '',
      quantity: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='my-2 w-full'>
      <button onClick={() => setForm(prevValue => !prevValue)} className='w-full'>{Form ? "Cancel" : "+ Add Order"}</button>

      <div className={`${Form ? '' : 'hidden'} flex rounded-xl my-2`}>
        <form action="" className='flex flex-col gap-2 w-full' onSubmit={addOrderHandler}>
          <input type="text" required={true} name="id" value={FormData.id} onChange={handleChange} placeholder='Enter ID' className='border p-2 rounded-xl outline-none text-sm' />
          <input type="text" required={true} name="customer_name" value={FormData.customer_name} onChange={handleChange} placeholder='Enter Customer Name' className='border p-2 rounded-xl outline-none text-sm' />
          <input type="text" required={true} name="customer_email" value={FormData.customer_email} onChange={handleChange} placeholder='Enter Customer Email' className='border p-2 rounded-xl outline-none text-sm' />
          <input type="text" required={true} name="product" value={FormData.product} onChange={handleChange} placeholder='Enter Product Number' className='border p-2 rounded-xl outline-none text-sm' />
          <input type="text" required={true} name="quantity" value={FormData.quantity} onChange={handleChange} placeholder='Enter Product Quantity' className='border p-2 rounded-xl outline-none text-sm' />
          <button className=' text-white p-2'>Add Order</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
