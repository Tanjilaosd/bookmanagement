import React from 'react'
import Navbar from './components/Navbar'
import {Outlet} from "react-router"
import { BookProvider } from './context/BookContext'


const App = () => {
  return (
    <div>
      <BookProvider>
        <Navbar/>
          <main className='min-h-[calc(100vh-100px)] mt-16'><Outlet/></main>
          <div>footer</div>
  
  </BookProvider>
     
  
  
    </div>
  )
}

export default App
