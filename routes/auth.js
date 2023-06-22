import { Router } from "express"
import express from "express"
import mongoose from "mongoose"
// import LocalStorage from 'node-'
import bcrypt from 'bcrypt'
import  { Schema, model } from "mongoose";
import {toast} from 'react-toastify'
const app = express()
const router = Router()

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    emailname: {type: String, required: true},
    password: {type: String, required: true},
  });
  
  const User = model("users", UserSchema);

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

router.post('/login', async (req, res) => {
    // console.log(req.body);
    const currentUser = await User.findOne({email: req.body.email})
    // const users =  await User.find({}).lean()
    // const currentUser = users.filter(item => item.email == req.body.email)
    // console.log(isPasswordEqual);
    if(!currentUser){
        console.log("User not found")
        res.redirect('/login')
        
    }else{
        const isPasswordEqual = await bcrypt.compare(req.body.password, currentUser.password)

        if(!isPasswordEqual){
            console.log("Password is not equal");
            // res.jsonp({success : true})
            // res.write(  '<script>window.alert("Applied successfully");window.location="/";</script>')
              res.redirect('/login')

            // toast("Password is not equal")
            // alert("Password is not equal")
        }else{
            res.redirect('/')

        }
        // alert
    }


    
    const user1 = {
        
        email: req.body.email,
        password: req.body.password,
      };
    //   mongoose.connection.collection('users').insertOne(user1)
})
  

router.post('/register', async (req, res) => {
    const currentUser = await User.findOne({email: req.body.email})

    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    console.log(req.body);
    const user1 = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedpassword,
      };
      if(!currentUser){
          mongoose.connection.collection('users').insertOne(user1)
          res.redirect('/')

      }else{
        res.redirect('/register')
      }


    //   localStorage.setItem(JSON.stringify(user1))
})

export default router;
