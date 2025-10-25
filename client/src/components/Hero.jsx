import React, { useState } from 'react'
import bookHeroImage from '../assets/book.png'
import { useBook } from '../context/BookContext'

const Hero = () => {
  const {books,filters,updateFilters} = useBook()
  const [searchInput,setSearchInput] = useState("")
  console.log(searchInput)
  const handleSubmit = (e) =>{
    e.preventDefault()
    updateFilters({
     search:searchInput.trim(),
     page:1
    })
  }

console.log("hero" , books)


  return (
  <div className='bg-gray-900 min-h-[600px] overflow-hidden  relative '>
    <div className='container mx-auto px-4 py-36   flex flex-col lg:flex-row flex-wrap items-center justify-between'>
        <div className='w-full lg:w-1/2  text-white z-10 '>

         <h1 className='text-5xl font-bold'>Wellcome to Our Books - <br />a haven for book lovers</h1>
         <form onSubmit={handleSubmit} className='mt-8 max-w-md flex gap-1'>
          <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}


           type="text" placeholder='enter title' className='bg-white px-4 py-4 border text-black w-full rounded-2xl' />
          <button type='submit' className='bg-amber-500 px-6 py-2 text-black rounded-2xl'>Search</button>
         </form>
        
        </div>
        <div className='w-full lg:w-1/2 '>
        <img src={bookHeroImage} alt="" className=' object-cover rounded-2xl' />
        </div>
    </div>


  </div>
  )
}

export default Hero