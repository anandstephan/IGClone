const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const {MONGOURI} = require('./keys');
const app = express();


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});

mongoose.connection.on('connected',()=>{
    console.log("Connection successfully Setup")
})

mongoose.connection.on('error',(err)=>{
    console.log("err"+err);
})

require('./models/user');

app.use(cors())
app.use(express.json())


app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.get('/',(req,res) =>{
    res.send('hello World!!!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,(()=> console.log(`Server is running at ${PORT}`)));