import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios"

const BookContext = createContext();

export const BookProvider = ({children}) => {
    const [books,setBooks] = useState([]);
    const [currentBook,setCurrentBook] = useState(null);
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)


    const [filters,setFilters] = useState({
        page:1,
        limit:8,
        genre:"",
        minYear:"",
        maxYear:"",
        author:"",
        minPrice:"",
        maxPrice:"",
        sortBy:"title",
        order:"asc",
        search:"",

    })


    const [pagination,setPagenation] = useState({
            totalBooks:12,
            currentPage: 1,
            totalPages: 2


    })



    const fetchBook =useCallback( async () => {
        try {
            setLoading(true)
            setError(null)
            const params = new URLSearchParams();
            object.entries(filters).forEach(([Key,value]) => {
                if( value !== ""){
                    params.append(Key,value)
                }
            })

            const response = await axios.get('http://localhost:5000/books')
           setBooks(response.data.books)
           setPagenation({
          currentPage:response.data.currentPage,
          totalBooks:response.data.totalBooks,
          totalPages:response.data.totalBooks
           })


          

            
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    },[filters]
 )
 


 const clearCurrentBook = useCallback(()=>{
    setBooks(null)
 },[])

 const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
        ...prev,
        ...newFilters,
        page:newFilters.hasOwnProperty("page") ? newFilters.page : 1,
    }))
 },[])
 useEffect(()=>{
        fetchBook()
    },[filters])



    



    const value = {
        books,currentBook,loading,error,filters,pagination,fetchBook,clearCurrentBook,updateFilters
    }




    return(
        <BookContext.Provider value={value}>
            {children}

        </BookContext.Provider>
    )
}

 export const useBook = () =>{
    const context = useContext (BookContext)
    if(!context){
        throw new Error("useBooks must be withing a Book provide")
    }
    return context;
}