const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: '345glkjsengljn3',
      title: 'First server side post',
      content: 'this is coming from the server'
    },
    { id: 'rthrhr33455',
      title: 'Second server side post',
      content: 'this is coming from the server'
    }
  ];
  res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts
  });
});

module.exports = app;
