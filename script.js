//  contain all the connection path  in it
//  responsible for invoking the server and establish the server

require('./mongodb');

const express= require('express')
var app = express()
const path = require('path')
const exp = require('express-handlebars')
const bodyParser= require('body-parser')

const courseController = require('./controller/courseController');

app.use(bodyParser.urlencoded({extended:true}))

//  create a welcome  message and direct  them to the main page

app.get('/',(req,res)=>{
    res.send(`
        < h2 style = "font-family: Malgun Gothic; color: midnightblue " > Welcome to Edureka Node.js MongoDB Tutorial!!</h2 >


         Click Here to go to < b > <a href="/course">Course Page</a> </b > ');
    `)
})
app.use(bodyParser.json())
// configure the express middleware fore the middleware

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exp({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine', 'hbs');

//  establish the  server connection

// port env variable
const port = process.env.PORT || 8080;
app.listen(port,()=>console.log(`listening on port ${port}..`))

//Set the Controller path which will be responding the user actions
app.use('/course', courseController);