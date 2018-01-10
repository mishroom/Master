const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lit');

const db = mongoose.connection;

// db.dropDatabase();
// mongoose.connect('mongodb://localhost/lit');

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genres: [String],
  isbn: Number,
  url: String,
  reviews: [Number],
});

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true
  },
  reviewedBooks: [Number],
  favoriteBooks: [Number],
});

const reviewSchema = new mongoose.Schema({
  idNameNumber: String,
  user: String,
  isbn: Number,
  text: String,
  rating: Number,
});

const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);

const selectAllBooks = (callback) => {
  Book.find({}, (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


//* *******************

const bookOne = new Book({
  title: 'Test Book Title 1',
  author: 'Test Author 1',
  genres: ['Horror', 'Comedy'],
  isbn: 1234567890,
  reviews: [],
});
const bookTwo = new Book({
  title: 'Test Book Title 2',
  author: 'Test Author 2',
  genres: ['True Crimes', 'Comedy'],
  isbn: 11234567890,
  reviews: [],
});
const bookThree = new Book({
  title: 'Test Book Title 3',
  author: 'Test Author 3',
  genres: ['Suspense', 'Action'],
  isbn: 99234567890,
  reviews: [],
});

const testUser = new User({
  name: 'dustin burns',
  username: 'dust_off',
  password: '1234',
  reviewedBooks: [1234567890],
  favoriteBooks: [1234567890, 11234567890, 99234567890],
});

const fakeReview = new Review({
  idNameNumber: 'dust_off1234567890',
  user: 'dust_off',
  isbn: 1234567890,
  text: 'I hated it',
  rating: 4,
});

// bookOne.save();
// bookTwo.save();
// bookThree.save();
// testUser.save();
// fakeReview.save();

const findUserFavorites = (user, cb) => {
  const books = [];
  User.find({ username: user }).then((foundUser) => {
    const len = foundUser[0].favoriteBooks.length;

    foundUser[0].favoriteBooks.forEach((book) => {
      Book.find({ isbn: book }).then((foundBook) => {
        books.push(foundBook);
      }).then(() => {
        if (books.length === len) {
          cb(books);
        }
      });
    });
  });
};

const findUserReviews = (user, cb) => {
  const reviews = [];
  User.find({ username: user }).then((foundUser) => {
    const len = foundUser[0].reviewedBooks.length;

    foundUser[0].reviewedBooks.forEach((book) => {
      const id = foundUser[0].username + book;
      Review.find({ idNameNumber: id }).then((foundReview) => {
        reviews.push(foundReview);
      }).then(() => {
        if (reviews.length === len) {
          cb(reviews);
        }
      });
    });
  });
};

const findProfile = (user, cb) => {
  User.find({ username: user }).exec(cb);
};

const createProfile = (user, cb) => {
  const newProfile = new User(user);
  newProfile.save().exec(cb);
};

const findBook = (book, cb) => {
  if (book.length === 10 || book.length === 13) {
    Book.find({ isbn: book }).exec(cb);
  } else {
    Book.find({ title: book }).exec(cb);
  }
};

module.exports = {
  selectAllBooks,
  findUserFavorites,
  findUserReviews,
  findProfile,
  findBook,
  createProfile,
};
