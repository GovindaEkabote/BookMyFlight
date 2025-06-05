const express = require('express')
const {PORT} = require('./config')
const app = express();
const apiRoutes = require('./routes')


app.use('/api',apiRoutes);

app.listen(PORT, ()=>{
    console.log(`Successfully Started the server on PORT: ${PORT}`);
    
})