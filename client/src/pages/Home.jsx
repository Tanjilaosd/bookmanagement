import React, { useEffect, useState } from 'react'
import { useBook } from '../context/BookContext'
import Hero from '../components/Hero'
import Shop from './Shop'

const Home = () => {
  const { books,currentBook,loading,error} = useBook()
  // console.log(books)
 
  return (
    <div>
    <Hero/>
   <Shop/>
      
     
    </div>
  )
}

export default Home
