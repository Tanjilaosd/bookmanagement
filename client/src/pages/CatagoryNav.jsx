import React from 'react'

const CatagoryNav = ({categories,activeCategory,onCatagoryChange}) => {
  return (
    <div className='p-4 '>
        <nav className='px-4 gap-5 flex flex-wrap overflow-x-auto '>{
              categories.map((categorie) => (
    <button onClick={() => onCatagoryChange(categorie)} key={categorie} className={`whitespace-nowrap cursor-pointer py-2 px-1 border-b-2 text-sm font-medium ${categorie === activeCategory ? "border-amber-500 text-amber-500  " : "border-transparent hover:text-gray-700 hover:border-gray-300"}`} >{categorie}</button>
        ))
    }
        </nav>
      </div>
  )
}

export default CatagoryNav