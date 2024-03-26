import React, { useContext, useEffect, useState } from 'react'
import supabase from '../Client'
import { Alert, Button, Card, CardContent, Chip, CircularProgress, Grid, Snackbar, Typography } from '@mui/material'
import { formatNumberWithTwoDecimals } from '../useful/functions'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Cart } from './App';
import Sort from './helpers/Sort';
import Filter from './helpers/Filter';
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from 'react-router-dom';

const Products = () => {

  const [currentTags, setCurrentTags] = useState([])

  const { cart, setCart } = useContext(Cart)
  const [data, setData] = useState();
  const [currentData, setCurrentData] = useState(data);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [fetchingData, setFetchingData] = useState(true)

  const [addItemToCartAlert, setAddItemToCartAlert] = useState(false)
  const [removeFromCartAlert, setRemoveFromCartAlert] = useState(false)
  const [noInventory, setNoInventory] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getAllItems = async () => {
      const { data, error } = await supabase.from('items').select('*')
      if (error) console.log(error)
      else
        setData(data)
        setCurrentData(data)
    }
    getAllItems()
    setFetchingData(false)
  }, [])

  useEffect(() => {
    const filterItemsByTags = (items, selectedTags) => {
      return items.filter((item) =>
        // selectedTags.every((tag) => item.tags.includes(tag))
        selectedTags.some((tag) => item.tags.includes(tag))
      );
    }

    if(!fetchingData && data){
      if(currentTags.length === 0) return setCurrentData(data)
      setCurrentData(filterItemsByTags(data, currentTags))
    }
  }, [currentTags])

  const addItemToCart = (item) => {
    const temp = [...cart];
    let exists = false;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === item.id) {
        if(temp[i].quantity < item.storage){
          temp[i].quantity += 1
          setAddItemToCartAlert(true)
          setTimeout(() => {
            setAddItemToCartAlert(false)
          }, 2000)
          return
        }else{
          setNoInventory(true)
          setTimeout(() => {
            setNoInventory(false)
          }, 2000)
          return
        }
        exists = true
      }
    }
    if (!exists) {
      temp.push({ ...item, quantity: 1 })
      setCart(temp)
      setAddItemToCartAlert(true)
      setTimeout(() => {
        setAddItemToCartAlert(false)
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
        setRemoveFromCartAlert(true)
        setTimeout(() => {
          setRemoveFromCartAlert(false)
        }, 2000)
      }
    }
    setCart(temp)
  }


  return (
    <div className={`bg-gray-50 p-4 relative h-screen`}>
      <h1 className='font-semibold'>Products</h1>
      
      {filterVisibility ? <Filter setFilterVisibility={setFilterVisibility} currentTags={currentTags} setCurrentTags={setCurrentTags} setCurrentData={setCurrentData} data={data} currentData={currentData}/> : null}

      <Snackbar open={addItemToCartAlert} autoHideDuration={5000} onClose={() => setAddItemToCartAlert(false)}>
        <Alert onClose={() => setAddItemToCartAlert(false)} severity="success" sx={{backgroundColor: 'lightgreen'}}>The item has been added to the cart!</Alert>
      </Snackbar>
      <Snackbar open={removeFromCartAlert} autoHideDuration={5000} onClose={() => setRemoveFromCartAlert(false)}>
        <Alert onClose={() => setRemoveFromCartAlert(false)} severity="warning" sx={{backgroundColor: 'lightyellow'}}>The item has been removed from the cart!</Alert>
      </Snackbar> 
      <Snackbar open={noInventory} autoHideDuration={5000} onClose={() => setNoInventory(false)}>
        <Alert onClose={() => setNoInventory(false)} severity="error" sx={{backgroundColor: 'lightcoral'}}>No more such items in inventory</Alert>
      </Snackbar>

      <div className='bg-gray-200 flex flex-wrap justify-between items-center px-4 py-2 rounded-md
       my-2 shadow-sm' >
        <Button variant="text" color='inherit' onClick={() => {setFilterVisibility(!filterVisibility)}} startIcon={<TuneIcon />}>Filter</Button>
        {data ? <Sort currentData={currentData} setCurrentData={setCurrentData} /> : 'loading'}
      </div>

      <ul>
        {currentTags ? currentTags.map((tag,index) => {
          return (
            <Chip key={index} label={tag} onDelete={() => {
              const temp = [...currentTags]
              const index = temp.indexOf(tag)
              temp.splice(index, 1)
              setCurrentTags(temp)
            }} />
          )
        }) : null}
      </ul>

      <div className='w-full text-center my-5'>{currentData ? <span className='font-bold'>{currentData.length}</span> : 'Loading'} products</div>
      <Grid container spacing={2}>
        {currentData ? currentData.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index} className=' hover:shadow-lg' >
              <Card className='h-[500px] relative'>
                <CardContent className='h-full'>
                  <div>
                    {item.storage ? null : <Chip label='Out of stock' color='error' className='absolute top-2 right-2'/>}
                    {item.storage >= 1 && item.storage <= 10 ? <Chip label='Low stock' color='warning' className='absolute top-2 right-2'/> : null}
                  </div>
                  <div className='h-3/4 w-full hover:cursor-pointer' onClick={() => {
              navigate(`/products/${item.id}`)  
            }}>
                    <img src={item.Images[0]} className="h-full w-full object-contain" alt="Item Image" />
                  </div>
                  <div className='truncate'>
                    <Typography variant="h5" component="div" className='text-center'>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" className='text-center '>
                      {item.description}
                    </Typography>
                  </div>
                  <div className='flex flex-row flex-wrap w-full justify-evenly mt-5 gap-x-10'>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', width: '100px'}}>
                      {formatNumberWithTwoDecimals(item.price)}$
                    </Typography>
                    <div>
                      <Button onClick={() => { if (item.storage) { removeItemFromCart(item) } }} sx={{'&:hover':{backgroundColor: 'lightskyblue'}}}>
                        <RemoveIcon color={item.storage ? '' : 'disabled'} />
                      </Button>
                      <Button onClick={() => { if (item.storage) { addItemToCart(item) } }} sx={{'&:hover':{backgroundColor: 'lightskyblue'}}} >
                        <AddIcon color={item.storage ? '' : 'disabled'} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        }) : <div className='absoulute w-full h-screen flex justify-center items-center'>
          <CircularProgress />
        </div>}
      </Grid>
    </div>
  )
}

export default Products