const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const api = require('../api/apiHelper.js');

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

app.post('/user/:username', (req, res) => {
  req.on('data', (chunk) => {
    const userData = JSON.parse(chunk.toString());
    // check if exists in database
    db.findProfile(userData.username, (err, data) => {
      if(err) {
        console.log("ERR", err);
      } else {
        console.log(data);
        if(!data.length) {
          db.createProfile(userData);
          res.json('success');
        };
        res.json('error');
      }
    });
  });
});

app.get('/book/:isbn', (req, res) => {
  const { isbn } = req.params;
  db.findBook(isbn, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data[0]);
    }
  });
});

app.get('/search/:title', (req, res) => {
  const { title } = req.params;
  db.findBook(title, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else if (data.length > 0) {
      res.jon(data);
    } else {
      api.searchBook(title, (searchResults) => {
        // console.log(searchResults);
        res.json(searchResults);
      });
    }
  });
});

app.get('/bestSellers', (req, res)=> {
  console.log("on line 58 in server")
  api.getBestSellersBooks((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(data);
    }
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
