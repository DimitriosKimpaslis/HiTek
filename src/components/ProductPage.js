import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../Client';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';
import { Cart } from './App';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ProductPage = () => {
    const { id } = useParams();
    const [data, setData] = useState()
    const { cart, setCart } = useContext(Cart)
    const [addToCartAlert, setAddToCartAlert] = useState(false)
    const [removeFromCartAlert, setRemoveFromCartAlert] = useState(false)
    const [itemQuantity, setItemQuantity] = useState(0)

    useEffect(() => {
        const getProduct = async () => {
            const { data, error } = await supabase.from('items').select('*').eq('id', id).single()
            if (error) console.log(error)
            else { setData(data) }
        }
        getProduct()
    }, [])

    useEffect(() => {
        const item = cart.find(item => item.id == id)
        setItemQuantity(item ? item.quantity : 0)
    }, [])

    const addItemToCart = (item) => {
        const temp = [...cart];
        let exists = false;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === item.id) {
                if(temp[i].quantity < item.storage){
                    temp[i].quantity += 1
                }
                exists = true
            }
        }
        if (!exists) {
            temp.push({ ...item, quantity: 1 })
            setCart(temp)
        }
        if(itemQuantity < item.storage){
            setItemQuantity(itemQuantity + 1)
            setAddToCartAlert(true)
            setTimeout(() => {
                setAddToCartAlert(false)
            }, 2000)
        }
    }

    const removeItemFromCart = (item) => {
        const temp = [...cart];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === item.id) {
                temp[i].quantity -= 1
                if (temp[i].quantity === 0) {
                    temp.splice(i, 1)
                }
            }
        }
        setCart(temp)
        if (itemQuantity > 0) {
            setItemQuantity(itemQuantity - 1)
            setRemoveFromCartAlert(true)
            setTimeout(() => {
                setRemoveFromCartAlert(false)
            }, 2000)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 m-4">
            {data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <Carousel>
                            {data.Images.map((image, index) => (
                                <div key={index} className='max-h-[500px]'>
                                    <img src={image} alt={`Product Image ${index + 1}`} className='object-contain w-full max-h-[500px]' />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="md:col-span-1 flex flex-col justify-center items-center md:items-start w-full text-center md:text-start">
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                        <p className="text-gray-700 mb-4">{data.description}</p>
                        <div className="flex items-center mb-4">
                            <p className="text-2xl font-semibold text-primary">${data.price}</p>
                            <p className="ml-2 text-gray-500">({data.storage} left)</p>
                        </div>
                        <div className='flex gap-4'>
                            <Button onClick={() => { if (data.storage) { removeItemFromCart(data) } }} sx={{'&:hover':{backgroundColor: 'lightskyblue'}}}>
                                <RemoveIcon color={data.storage ? '' : 'disabled'} />
                            </Button>
                            <div className='flex justify-center items-center'>
                                <p className='text-gray-900 font-semibold'>
                                    {itemQuantity}
                                </p>
                            </div>
                            <Button onClick={() => { if (data.storage) { addItemToCart(data) } }} sx={{'&:hover':{backgroundColor: 'lightskyblue'}}}>
                                <AddIcon color={data.storage ? '' : 'disabled'} />
                            </Button>
                        </div>
                    </div>
                    {addToCartAlert && (<Alert severity="success" sx={{backgroundColor: 'lightgreen'}}> 
                        The item has been added to the cart!
                    </Alert>)}
                    {removeFromCartAlert && (<Alert severity="warning">
                        The item has been removed from the cart!</Alert>)}
                </div>
            ) : (
                <div className="flex justify-center items-center h-32">
                    <CircularProgress />
                </div>
            )}
        </div>

    );
};

export default ProductPage;
