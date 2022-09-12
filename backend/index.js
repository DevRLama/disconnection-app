const express = require('express');
var cors = require('cors');
const connectToMongo=require('./db');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json())


//Available routes
app.use('/api/user',require('./routes/user'))
app.use('/api/dc',require('./routes/dc'))

connectToMongo();

app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
})
