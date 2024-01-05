require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { sqltrial } = require('./src/services/sqltrial');
const app = express();
const sql=require("./src/services/sqltrial")

const port = process.env.PORT || 3000; // Use the PORT variable from .env or default to 3000

app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {

  const {name, age}= req.query;

  res.send(`${name},${age}`);
});


app.post("/contact",(req,res)=>{

  const {name,phone, email}= req.body;

if(!name){
  res.status(422).json({message:"name missing"})
}

  res.status(200).json({message:`contact details for ${name} received as ${phone} and ${email}`})

})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
