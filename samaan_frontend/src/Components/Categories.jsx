import React from 'react'
import './Categories.css'
import CategoriesCard from './CategoriesCard'

const Categories = () => {
    return (
        <div className='CategoriesOuter'>
            <h1 className='CatogeriesHeaer'>Categories</h1>
            <div className="CatogeriesInner">
                <CategoriesCard/>
                <CategoriesCard/>
                <CategoriesCard/>
                <CategoriesCard/>
                <CategoriesCard/>
                <CategoriesCard/>
            </div>
        </div>
    )
}

export default Categories
