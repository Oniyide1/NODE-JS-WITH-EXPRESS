const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

console.log(process.env);




const port = process.env.PORT || 3001

// Start listening on port 3001
app.listen(port, () => {
    console.log('port connected') 
})


