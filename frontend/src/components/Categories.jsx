import React from 'react'
import { categories } from '../data'
import CategoryItem from './CategoryItem'

const Categories = () => {
    return (
        <div>
            <div className='text-4xl mt-4 text-center font-extralight'>
                Categories
            </div>
            <div className='flex my-2 justify-center flex-wrap flex-row flex-1 p-2'>
                {categories.map((item) =>
                    <CategoryItem item={item} key={item.id} />)
                }
            </div>
        </div>
    )
}

export default Categories