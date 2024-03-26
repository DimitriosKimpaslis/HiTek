import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import supabase from '../Client'
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material'
import { formatNumberWithTwoDecimals } from '../useful/functions'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState()

  useEffect(() => {
    const getLowStorageItems = async () => {
      const { data } = await supabase.from('items').select('*').lt('storage', 10).limit(6)
      setData(data)
    }
    getLowStorageItems()
  }, [])

  return (
    <div>
      <div className='w-full h-[32rem] relative flex items-center justify-center bg-[url(https://xuxmcvnygjzpieysrofl.supabase.co/storage/v1/object/public/Images/bg.jpg?t=2023-10-28T11%3A12%3A40.162Z)] bg-cover bg-center mb-5'>
        <div className='absolute w-full bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 text-center'>
          <h1 className='text-5xl text-white font-bold'>MacBook Pro 14-Inch</h1>
          <p className='text-white text-xl mb-6'>Just came out, this new beast is taking over the internet!</p>
          <Button variant="contained" size='large' color="info" onClick={() => {
            navigate('/products/11')
          }} sx={{color: 'white', backgroundColor: 'black'}}>
            Get It Now
          </Button>
        </div>
      </div>
      <h1 className='w-full text-center text-4xl font-bold text-gray-900 mb-6 leading-tight'>
        Grab It Before It's Gone: Limited Stock Availability!
      </h1>
      <Grid container spacing={2}>
        {data ? data.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index} >
              <Card className='h-[600px] relative' >
                <CardContent className='h-full'>
                  <div>
                    {item.storage ? null : <Chip label='Out of stock' color='error' className='absolute top-2 right-2' />}
                    {item.storage >= 1 && item.storage <= 10 ? <Chip label='Low stock' color='warning' className='absolute top-2 right-2' /> : null}
                  </div>
                  <div className='h-3/4 w-full hover:cursor-pointer' onClick={() => {navigate(`/products/${item.id}`)}}>
                    <img src={item.Images[0]} className="h-full w-full object-contain" alt="product" />
                  </div>
                  <div className='truncate'>
                    <Typography variant="h5" component="div" className='text-center'>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" className='text-center '>
                      {item.description}
                    </Typography>
                  </div>
                  <div className='flex flex-col w-full justify-evenly items-center mt-5'>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {formatNumberWithTwoDecimals(item.price)}$
                    </Typography>
                    <p className='text-md border-black border rounded-md font-medium hover:cursor-pointer px-4 py-2' onClick={() => {navigate(`/products/${item.id}`)}}>{item.storage ? `Only ${item.storage} left!` : 'No items left'}</p>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        }) : <p>Loading...</p>}
      </Grid>
    </div>
  )
}

export default Home