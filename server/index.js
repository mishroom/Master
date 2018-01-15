const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const api = require('../api/apiHelper.js');
const { organizeBookData } = require('../api/apiTest.js');
const convert = require('xml-js');
const { addReviewData } = require('../api/apiTest.js');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());

app.get('/items', (req, res) => {
  db.selectAllBooks((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/user/:username', (req, res) => {
  const { username } = req.params;
  db.findProfile(username, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data[0]);
    }
  });
});

app.post('/login', (req, res) => {
  let loginData = {};
  req.on('data', (chunk) => {
    loginData = JSON.parse(chunk.toString());
    db.findProfile(loginData.username, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        if (!data.length) {
          loginData.type = 'invalid username';
        } else if (loginData.password === data[0].password) {
          loginData.type = 'success';
          loginData.userProfile = data[0];
        } else {
          loginData.type = 'wrong password';
        }
      }
      res.json(loginData);
    });
  });
});

app.post('/signup', (req, res) => {
  req.on('data', (chunk) => {
    const userData = JSON.parse(chunk.toString());
    const response = {
      type: '',
      data: {},
    };
    // check if exists in database
    db.findProfile(userData.username, (err, data) => {
      if (err) {
        console.log('ERR', err);
      } else if (!data.length) {
        db.createProfile(userData);
        // figure out how to callback this
        response.type = 'success';
        response.data = userData;
        res.json(response);
      } else {
        response.type = 'error';
        res.json(response);
      }
    });
  });
});

app.get('/book/:isbn', (req, res) => {
  const { isbn } = req.params;
  db.findBook(isbn, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else if (data.length > 0) {
      res.json(data[0]);
    } else {
      api.searchBook(isbn, (errAPI, searchResults) => {
        if (errAPI) {
          res.sendStatus(500);
        } else {
          api.getMoreBookData(searchResults, (error, results) => {
            if (error) {
              res.sendStatus(500);
            } else {
              searchResults.isbn13 = isbn;
              const bookData = organizeBookData(searchResults);
              const parRez = convert.xml2json(results.data);
              const jsonRez = JSON.parse(parRez).elements[0].elements[1].elements;
              const updatedData = addReviewData(jsonRez, bookData);
              var genres = api.filterByPopularShelves(updatedData);
              updatedData.genres = genres;
              db.save(updatedData);
              res.json(updatedData);
            }
          });
        }
      });
    }
  });
});

app.get('/search/:title', (req, res) => {
  const { title } = req.params;
  api.searchBook(title, (err, searchResults) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(searchResults);
      //res.json(organizeBookData(searchResults));
      // const parsResults = searchResults.map((book) => {
      //   const cleanBook = organizeBookData(book);
      //   return organizeBookData(book);
      // });
      //res.json(parsResults);
    }
  });
});

app.get('/bestSellers', (req, res) => {
  api.getBestBooks((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data.data);
    }
  });
});

app.get('/rate/:isbn/:rating', (req, res) => {
  // !!!!!!!!!!!!!!
  // get the current loged in user
  // !!!!!!!!!!!!!!
  const { isbn } = req.params;
  const { rating } = req.params;
  res.json([isbn, rating]);
});


app.post('/review', (req, res) => {
  db.saveReview(req.body, (err, data) => {
    // console.log(err, data);
    res.json(data);
  });
});


app.listen(3000, () => {
  console.log('listening on port 3000!');
});
