const express = require('express')
const app = express()
const port = 3002
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
//connection to Database
const connectionString = 'mongodb+srv://demo:demo123@cluster0.5tbcz.mongodb.net/TodosApp?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) return console.error(err)
        console.log(`Connected to DB`)
        const db = client.db('TodosApp')
        const todosCollection = db.collection('todos')

        app.use(express.urlencoded({extended: true}))
        app.use(express.static("views"))

        app.get('/', (req,res) => { 
        const task = db.collection('todos').find().toArray()
        .then (results => {
            console.log(results)
            res.render('index.ejs',{task : results})
        }).catch(error => console.error(error))
        
    
        })//end of app get

        app.post('/todos', (req,res) => {
           todosCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
                console.log(result)
            }) 
            .catch(error => console.error(error))
        })//end of post task
        
    })//end of MongoClient Connection

//server Configurations
app.listen(port, () => console.log(`listening to port: ${port}`))