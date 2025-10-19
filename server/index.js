require("dotenv").config()
const express = require("express");
const app = express()
const PORT = process.env.PORT
const mongoose = require("mongoose")
const db = process.env.MONGO_URL
const cors = require("cors")



// middleware

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  res.send("hellwo world")
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://tanjila:tanjila123@cluster0.oxemh6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    // create db and collection 
    const db = client.db("text")
    const bookCollection = db.collection("crud")

    //create a book post
    app.post('/books',async(req,res)=>{
        const bookData = req.body;
        try {
          const book = await bookCollection.insertOne(bookData)
          res.status(201).json(book)
        } catch (error) {
          res.status(500).json({error:error.messege})
        }
    }) 

    // get all books
    app.get("/books",async(req,res)=>{
        const {page,limit,genre,minYear,maxYear,author,minPrice,maxPrice,sortBy,order,search} = req.query;
      try {
        const currentPage = Math.max(1,parseInt(page) || 1);
        const perPage= parseInt(limit) || 10;
        const skip = (currentPage-1) * perPage;

        const filter = {};
        if(search){
          filter.$or = [
            {title:{$regex:search, $options:"i"}},
            {description:{$regex:search,$options:"i"}}
          ]
        }
        if(genre) filter.genre = genre;
        if(minYear || maxYear) {
        filter.publishedYear={
          ...(minYear && {$gte : parseInt(minYear)}),
          ...(maxYear && {$lte: parseInt(maxYear)})
        }
          
        }

        if(author) filter.author = author;
        if(minPrice || maxPrice) {
          filter.price = {
            ...(minPrice && {$gte: parseFloat(minPrice)}),
          ...(maxPrice && {$lte: parseFloat(maxPrice)})
          }
        }

        const sortOptions = { [sortBy || "title"]:order === "desc" ? -1 : 1}
        const [books,totalBooks] = await Promise.all([bookCollection.find(filter).sort(sortOptions).skip(skip).limit(perPage).toArray(),bookCollection.countDocuments(filter)])




        // const books = await bookCollection.find(filter).toArray();
        res.status(201).json({books,totalBooks,currentPage,totalPages:Math.ceil(totalBooks / perPage)})
        
      } catch (error) {
        res.status(500).json({error:error.messege})
        
      }
    })


    // get book By id


    app.get("/books/:id",async(req,res)=>{
      const bookId = req.params.id;
      try {
        const book = await bookCollection.findOne({_id: new ObjectId(bookId)})
        if(!book) return res.status(404).json({messege:"book not found"} )
            res.json(book)
       
      
      } catch (error) {

         res.status(500).json({error:error.messege})
      }
      
    })


    // update a book (PUT)

    app.put("/books/:id",async(req,res)=>{
      try {
        const updateBook = await bookCollection.updateOne({_id: new ObjectId(req.params.id)},{$set:req.body})
        
      } catch (error) {
          res.status(500).json({error:error.messege})
      }
    })


    // delete a book (Delete)
    

    app.delete("/books/:id",async(req,res)=>{
      try {
        await bookCollection.deleteOne({_id:new ObjectId(req.params.id)})
      res.json({messege:"book deleted"})
      } catch (error) {
          res.status(500).json({error:error.messege})
      }
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);












app.listen(PORT,()=>{
    console.log("thell hellow world")
})



