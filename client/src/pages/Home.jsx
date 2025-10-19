import React, { useEffect, useState } from 'react'
import { useBook } from '../context/BookContext'

const Home = () => {
  const { books,currentBook,loading,error} = useBook()
  console.log(books)
 
  return (
    <div>
     home
      
     
    </div>
  )
}

export default Home
