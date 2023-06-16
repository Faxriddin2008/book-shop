const express = require('express')

const {engine, create} = require('express-handlebars')

// import pkg from "express";
const path = require('path')
// const { express } = pkg;
const app = express()
const PORT = process.env.PORT;
// app.set('view engine', 'ejs')


const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine);


app.set('view engine', 'hbs');

app.set('views', './views')
app.use(express.static('css'))


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/products', (req, res) => {
    res.render('products')
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.get('/login', (req, res) => {
    res.render('login')
})


app.get('/register', (req, res) => {
    res.render('register')
})
app.listen(2008, () => {console.log( `server started ` )})