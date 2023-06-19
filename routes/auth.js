import { Router } from "express"
import express from "express"
import mongoose from "mongoose"

const app = express()
const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Book Shop | Login",
        isLogin: true,
    })
})


router.get('/register', (req, res) => {
    res.render('register', {
        title: "Book Shop | Register",
        isRegister: true
    })
})

router.post('/login', (req, res) => {
    // console.log(req.body);
    const user1 = {
        
        email: req.body.email,
        password: req.body.password,
      };
      mongoose.connection.collection('users').insertOne(user1)
    res.redirect('/')
})


router.post('/register', (req, res) => {
    console.log(req.body);
    const user1 = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      };
      mongoose.connection.collection('users').insertOne(user1)
    res.redirect('/')
})

export default router;
