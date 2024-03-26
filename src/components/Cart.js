import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { Cart } from './App';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import supabase from '../Client';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

function CartPage() {
  const { cart, setCart } = useContext(Cart)
  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate()
  const [error, setError] = useState({ error: false, message: '' })

  const clientVerify = async (e) => {
    e.preventDefault()

    //client verify
    const { data } = await supabase.auth.getUser()
    const user = data.user
    if (!user) return navigate(`/signin?cart=${JSON.stringify(cart)}`)

    //server verify
    const items = cart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      }
    })
    fetch("https://v9yk9cebw0.execute-api.eu-north-1.amazonaws.com/default/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        userId: user.id,
        userEmail: user.email
      })
    })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch(e => {
        setError({ error: true, message: e.error })
        console.error(e.error)
      })
  }


  return (
    <Container className='p-4'>
      {error.error && <Alert severity="error">{error.message}</Alert>}
      <h1 className='font-semibold'>Cart</h1>
      {cart.length === 0 ? (
        <Typography variant="subtitle1">Your cart is empty.</Typography>
      ) : (
        <>
        <List>
          {cart.map((item) => (
            <Card key={item.id} style={{ marginBottom: 16 }} className='py-4'>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt={item.name}
                    sx={{ height: 100, objectFit: 'contain' }}
                    image={item.Images[0]}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CardContent className='text-center sm:text-left'>
                    <Typography variant="h6" sx={{ fontWeight: 'bold'}} onClick={() => navigate('/products/' + item.id)} className='hover:text-blue-600 hover:cursor-pointer text-blue-500'>{item.name}</Typography>
                    <Typography variant="body1">Price: <span className='font-semibold'>${item.price}</span></Typography>
                    <Typography variant="body1" >Quantity: <span className='font-semibold'>{item.quantity}</span></Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={4} className='w-full flex justify-center items-center'>
                  <Button variant="contained" color="error" onClick={() => {
                    const temp = [...cart]
                    const index = temp.indexOf(item)
                    temp.splice(index, 1)
                    setCart(temp)
                  }}>
                    <DeleteForeverIcon />
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ))}
          <Alert severity="info" className='mt-4' sx={{ display: "flex", justifyContent: "center" }}>This is a demo site. No real purchases will be made. In order for the payment to go through use card number: 4242 4242 4242 4242</Alert>
        </List>
        {cart.length > 0 && (
        <Card>
          <CardContent className='bg-yellow-400 py-8 flex flex-col justify-center items-center text-center'>
            <Typography variant="h6">Total Price: <span className='font-semibold'>${totalPrice.toFixed(2)}</span></Typography>
            <Button variant="contained" color="success" onClick={clientVerify}>
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      )}
        </>
      )}
      
    </Container>
  );
}

export default CartPage;
