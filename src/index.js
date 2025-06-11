const express = require('express')
const {serverConfig, loggerConfig} = require('./config')
const app = express();
const apiRoutes = require('./routes')

app.use(express.json())

app.use('/api',apiRoutes);


app.listen(serverConfig.PORT, ()=>{
    console.log(`Successfully Started the server on PORT: ${serverConfig.PORT}`);
})