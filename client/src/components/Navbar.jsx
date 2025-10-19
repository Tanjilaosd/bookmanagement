import React, { useState } from 'react'
import {Link} from "react-scroll"
import { FaBars} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { NavLink } from 'react-router';


const Navbar = () => {
  const [click,setClick] = useState(false)
  const handleClick = () => {
    setClick(!click)
  }
  const context = <>
  <div className='lg:hidden  block absolute  w-full top-10 left-0 right-0 bg-slate-900 transition'>
  <ul className='text-center text-xl p-20 flex-col flex'>
    <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' > <NavLink to='/'>Home</NavLink></Link>
     <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' > <NavLink to='/books'>shop</NavLink> </Link>
      <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' to='/books/:id'> <NavLink to='/books/:id'>BookDetails</NavLink>  </Link>
       <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' ><NavLink to="/books/edit/:id">editBook</NavLink></Link>
        <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' > <NavLink to='/books/add'>AddBooks</NavLink></Link>
  </ul>
  </div>
  
  </>
  return (
  <nav >
    <div className='h-10vh bg-slate-900 flex justify-between z-50 text-white lg:py-4 px-20 '>
      <div className='flex items-center flex-1'><span className='text-3xl font-bold'>Logo</span></div>
      <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
        <div className='flex-10'>
          <ul className='flex gap-9 mr-16 text-[18px]'>
    <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' > <NavLink to='/'>Home</NavLink></Link>
     <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' > <NavLink to='/books'>shop</NavLink> </Link>
      <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' to='/books/:id'> <NavLink to='/books/:id'>BookDetails</NavLink>  </Link>
       <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' ><NavLink to="/books/edit/:id">editBook</NavLink></Link>
        <Link spy={true} smooth={true}  className='my-4 py-4 border-slate-800 hover:bg-slate-500 hover:rounded' > <NavLink to='/books/add'>AddBooks</NavLink></Link>
  </ul>


          </div>
           
          </div>
          <div className='bg-slate-800 flex flex-col md:hidden'>
                {click && context}
          </div>
          <button className='block sm:hidden transition ' onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </button>
    </div>
  </nav>
  )
}

export default Navbar