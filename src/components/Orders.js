import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import supabase from '../Client';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [userEmail, setUserEmail] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const getUserEmail = async () => {
            const { data } = await supabase.auth.getUser()
            setUserEmail(data.user.email)
        }
        getUserEmail()
    }, [])

    useEffect(() => {
        const getOrders = async () => {
            const { data, error } = await supabase.from('orders').select('*')
                .eq('email', userEmail)
            if (error) console.log(error)
            if (userEmail) {
                setOrders(data)
            }
        }
        getOrders()
    }, [userEmail])

    const getDate = (orderDate) => {
        const date = new Date(orderDate);
        // Extract the date components
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is 0-based, so add 1
        const day = date.getDate();

        // Extract the time components
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Format the date and time components as strings
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return ('Date: ' + formattedDate + ' Time: ' + formattedTime)
    }

    return (
        <Container className='p-4 h-screen'>
            <h1 className='font-semibold'>Orders</h1>
            {orders.length === 0 ? <p>No orders</p> : (
                <div className='grid grid-cols-1 gap-4'>
                    {orders.map(order => {
                        let sum = 0
                        return (
                            <div className='p-4 bg-white rounded-lg shadow-md'>
                                <h2 className='font-bold text-2xl bg-gray-800 p-2 text-gray-100'>Order: #{order.customId.toLowerCase()}</h2>
                                {order.items.map(item => {
                                    sum += item.price * item.quantity
                                    return (
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-800 my-2 py-4 px-2'>
                                            <div className='block '>
                                                <p className='font-bold hover:text-blue-600 text-blue-500 hover:cursor-pointer' onClick={() => { navigate('/products/' + item.id) }}>{item.name}</p>
                                            </div>
                                            <div className='block'>
                                                <p>Price: <span className='font-semibold'>{item.price * item.quantity}$</span></p>
                                            </div>
                                            <div className='block'>
                                                <p>Quantity: <span className='font-semibold'>{item.quantity}</span></p>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className=' p-2'>
                                    <p className='font-semibold text-lg'>Total: {sum}$</p>
                                    <p className='italic text-sm'>Created: <span className='font-medium'>{getDate(order.created_at)}</span></p>
                                </div>

                            </div>
                        )
                    })}
                </div>
            )}
        </Container>
    )
}

export default Orders