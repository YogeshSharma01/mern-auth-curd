const express = require('express');
var cors = require('cors')
const app = express();
const port = 5000;
const connectToMongo = require('./db');

app.use(cors())

app.use(express.json());
/* Available routes */
app.use('/api/auth', require('./routers/auth'));
app.use('/api/notes', require('./routers/notes'));

connectToMongo();

app.listen(port, function(error){
    if(error){
        console.log('Error in running the server on port number' + port);
    }else{
        console.log('iNotebook is running fine on port number'+ port)
    }
})
