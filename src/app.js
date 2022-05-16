const express = require("express")
const port = process.env.PORT || 3000
const path = require("path")
const hbs = require("hbs")
require("./db/conn")
const user = require("./models/feedback")
const async = require("hbs/lib/async")
const User = require("./models/feedback")

const app = express()

// paths
const staticPath = path.join(__dirname, "../public")
const partialPath = path.join(__dirname, "../templates/partials")
const teamplatePath = path.join(__dirname, "../templates/views")

//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))) //bootstrap css
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))) //bootstrap js
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist"))) //jquery
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "hbs") //set a view engine
app.set("views", teamplatePath)
hbs.registerPartials(partialPath)


//static frontend
app.use(express.static(staticPath))

//Routing
app.get('/', (req, res) => {
    // res.send("This is Home page")
    res.render("index")
})
app.post('/contact', async (req, res) => {
    try {
        // res.send(req.body)
        const userData = new User(req.body)
        await userData.save()
        res.status(201).render("index")

    } catch (err) {
        res.status(500).send(err)
    }
})

//create server
app.listen(port, () => {
    console.log(`Server is running successfully `);
})