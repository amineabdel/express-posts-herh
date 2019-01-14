const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

let posturl = 'http://jsonplaceholder.typicode.com/'

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Redirect to posts
app.get('/', (req, res) => {
  res.redirect('/posts');
});


// List all posts
app.get('/posts', (req, res) => {
  request(posturl + 'posts', (error, response, body) => {
    res.render('posts.ejs', { posts: JSON.parse(body) })
  })
});


// Show the search form
app.get('/search', (req, res) => {
  res.render('search.ejs', { post: '' });
});


// Find all comments for post
app.post('/search', (req, res) => {
  title = req.body.title
  request.get(posturl + 'posts', (err, resp, body)=> {
    posts = JSON.parse(body);
    for(var i = 0; i < posts.length; i++) {
      if(title == posts[i].title) {
        i += 1;
        comment_url = posturl + 'post/' + i + '/comments';
        request.get(comment_url, function(err, resp, body) {
            res.render('search_result.ejs', { comm: JSON.parse(body) });
        });
    
      }
    }
  })

});



