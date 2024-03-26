import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Filter = (props) => {
    const { setFilterVisibility, currentTags, data, setCurrentTags } = props

    const companyTags = [
        "Amazon",
        "Apple",
        "ASUS",
        "Bose",
        "Dell",
        "Google",
        "HP",
        "Lenovo",
        "Microsoft",
        "Nikon",
        "Nintendo",
        "OnePlus",
        "Samsung",
        "Sony"
      ]
    const typeTags = [
        "Camera",
        "Gaming Console",
        "Headphones",
        "Laptop",
        "Smartphone",
        "Tablet"
      ];

    const [numberOfProducts, setNumberOfProducts] = useState({});

    const getNewNumberOfProducts = (tag, tagsArray) => {
        let count = 0
        // if (currentTags.length === 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].tags.includes(tag)) {
                    count++
                }
            }
            return count
    }


    useEffect(() => {
        // Call the function for each tag and store the results in state
        const productsCount = {};
        companyTags.forEach(tag => {
            productsCount[tag] = getNewNumberOfProducts(tag);
        });
        typeTags.forEach(tag => {
            productsCount[tag] = getNewNumberOfProducts(tag);
        });
        setNumberOfProducts(productsCount);
    }, [currentTags]);

    return (
        <div className='bg-white border'>
                <CloseIcon onClick={() => {setFilterVisibility(false)}} className='cursor-pointer m-4'/>
            <div className='flex flex-wrap justify-center gap-5 w-full my-2'>
                <div className='flex flex-col w-96 px-10 py-2 gap-2 bg-gray-100 shadow-lg h-[300px] overflow-y-auto md:h-[500px] md:overflow-auto'>
                    <h1 className='text-center font-semibold'>Device</h1>
                    {typeTags.map((tag, index) => {
                        return (
                            <Button key={index} variant='outlined' color='inherit' sx={{color: 'blue', borderColor: 'black'}} onClick={() => {
                                if (currentTags.includes(tag)) {
                                    return
                                }
                                const temp = [...currentTags]
                                temp.push(tag)
                                setCurrentTags(temp)
                            }}>{tag}<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-gray-800 bg-gray-300 rounded-full">{numberOfProducts[tag]}</span></Button>
                        )
                    })}
                </div>
                <div className='flex flex-col w-96 px-10 py-2 gap-2 bg-gray-100 shadow-lg h-[300px] overflow-y-auto md:h-[500px] md:overflow-auto'>
                    <h1 className='text-center font-semibold'>Manufacturer</h1>
                    {companyTags.map((tag,index) => {
                        return (
                            <Button key={index} variant='outlined' color='inherit' sx={{color: 'blue', borderColor: 'black'}} onClick={() => {
                                if (currentTags.includes(tag)) {
                                    return
                                }
                                const temp = [...currentTags]
                                temp.push(tag)
                                setCurrentTags(temp)
                            }}>{tag}<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-gray-800 bg-gray-300 rounded-full">{numberOfProducts[tag]}</span></Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Filter