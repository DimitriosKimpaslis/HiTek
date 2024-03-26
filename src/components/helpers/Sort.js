import { InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';

const Sort = (props) => {
    const {setCurrentData, currentData} = props
    const [sortBy, setSortBy] = useState('')
    
    const sortProducts = (sortBy) => {
        const newData = [...currentData]
        switch (sortBy) {
            case 'price-high-to-low':
                return newData.slice().sort((a, b) => b.price - a.price);
            case 'price-low-to-high':
                return newData.slice().sort((a, b) => a.price - b.price);
            default:
                return newData;
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
      };

    useEffect(() => {
        if(!currentData) return
        setCurrentData(sortProducts(sortBy))
    }, [sortBy])

    return (
        <FormControl className='w-32' size="small">
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sort"
                onChange={handleSortChange}
            >
                <MenuItem value={'price-low-to-high'}>price-low-to-high</MenuItem>
                <MenuItem value={'price-high-to-low'}>price-high-to-low</MenuItem>
            </Select>
        </FormControl>
    )
}

export default Sort