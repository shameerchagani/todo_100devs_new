const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const MongoClient = require('mongodb').MongoClient


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

        app.set('view engine', 'ejs')
        app.use(express.urlencoded({extended: true}))
        app.use(express.static("views"))
        app.use(express.json())

        app.get('/', async (req, res) => {
            const task = await db.collection('todos').find().toArray()
            res.render('index.ejs', { task: task })
        }) //end of app get

        app.post('/todos', (req, res) => {
            todosCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                    // console.log(result)
                })
                .catch(error => console.error(error))
        }) //end of post task


        app.delete('/deleteTaskItem', (req, res) => {
            db.collection('todos').deleteOne({task:req.body.delTask})
                .then(result => {
                    console.log(`here is the thing ${req.body.delTask}`)
                    res.json('Todo Deleted')
            })
            .catch(error => console.error(error))
        
        }) //end of deleteOne

    }) //end of MongoClient Connection

//server Configurations
app.listen(port, () => console.log(`listening to port: ${port}`))