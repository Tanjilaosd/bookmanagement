import React, { useEffect } from 'react'
import { useBook } from '../context/BookContext'
import BookGrid from './BookGrid';
import CatagoryNav from './CatagoryNav';
import SortBooks from './SortBooks';

const Shop = () => {
  const {
     books,currentBook,loading,error,filters,pagination,fetchBook,clearCurrentBook,updateFilters,fetchBookDetails
  } = useBook();
  const categories = ["All collections","fictions","Adventure","Romance","Dystopian","Historical","Non-Fictions"]

  useEffect(() => {fetchBook()}, [filters,fetchBook])

  const handleCategoryChange = (category) =>{
    updateFilters({
      genre:category === "All collections" ? "" : category
    })
  }


  const handleSortChange = (sortConfig) => {
  updateFilters({
    sortBy:sortConfig.title,
    order:sortConfig.order,
    page:1
  })
   
  }



 
  const handleDeleteBook = () => {
    console.log("books deleted")
  }
  return (
   <div className='container mx-auto px-4 py-12 min-h-screen'>
    <div className='flex justify-between items-center flex-wrap border-b border-gray-500 pb-4'>
      <CatagoryNav 
      categories={categories}
      activeCategory = {filters.genre || "All Collections"}
      onCatagoryChange = {handleCategoryChange}
      />
      <div className='px-4 flex justify-end py-4'><SortBooks 
      currentSort={{
        sortBy:filters.sortBy,
        order:filters.order
      }}
      onSortChange={handleSortChange}
      /></div>


    </div>
    {/* result summery */}
    <div className='py-4 text-gray-600'>Showing {pagination.totalBooks > 0 ? (pagination.currentPage -1)*filters.limit+1 : 0} - 
      <span>{Math.min(pagination.currentPage * filters.limit , pagination .totalBooks)}</span> of {pagination.totalBooks} books</div>



    <div> 
      <BookGrid books={books} loading={loading} error={error} onDeleteBooks={handleDeleteBook}/>
      </div>
   </div>
  )
}

export default Shop