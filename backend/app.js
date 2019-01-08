const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://jeet:f90mc28yz4W7Inrd@cluster0-0sus6.mongodb.net/node-angular?retryWrites=true')
  .then(()=>{
    console.log('Connected to database');
  })
  .catch(()=>{
    console.log('Connection failed!');
  });
  
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save();
  res.status(201).json({
    message: 'Post added successfully!!!'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
  // const posts = [
  //   {
  //     id: 'asd12e',
  //     title: 'First server side post',
  //     content: 'This is coming from server side'
  //   },
  //   {
  //     id: 'hsd23d',
  //     title: 'Second server side post',
  //     content: 'This is coming from server side!'
  //   }
  // ];


});

module.exports = app;
