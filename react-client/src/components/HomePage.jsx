import React from 'react';
import $ from 'jquery';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import BookCard from './BookCard.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: '',
      loading: true,
      view: this.props.view,
    };
    this.getBestSellersBooks = this.getBestSellersBooks.bind(this);
    this.setBook = this.setBook.bind(this);
  }

  componentDidMount() {
    this.getBestSellersBooks();
    this.setState({
      loading: true,
      view: this.props.view,
    });
  }

  getBestSellersBooks() {
    $.ajax({
      url: '/bestSellers',
      type: 'GET',
    })
      .done((result) => {
        this.setBook(result);
      })
      .fail((err) => {
        throw err;
      });
  }

  setBook(bookArray) {
    const books = bookArray.results;

    let numCount = books.length;
    let returnCount = 0;

    const updatedBooks = [];
    books.forEach((book) => {
      if (book.isbns.length > 0) {
        const isbn = book.isbns[0].isbn13;
        this.props.fetch('book', isbn, (goodReads) => {
          returnCount++;
          if (goodReads !== null) {
            book.imageURL = goodReads.imageURL;
            book.averageRating = goodReads.averageRating;
            updatedBooks.push(book);
          } else {
            numCount--;
          }

          if (numCount === returnCount) {
            console.log(this.state.view);
            if (this.state.view === null) {
              this.setState({
                books: updatedBooks,
                loading: false,
              });
            }
          }
        });
      }
    });
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.loading
          ?
            <div style={{ textAlign: 'center' }}>
              <CircularProgress
                className={classes.progress}
                size={100}
              />
            </div>
          :
            <Grid
              container
              className={classes.root}
              justify="center"
            >
              {this.state.books.map(book => (
                <BookCard
                  book={book}
                  key={book.isbns[0].isbn13}
                  changeView={this.props.changeView}
                />
            ))}
            </Grid>
        }

      </div>
    );
  }
}

// GuttersGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(HomePage);
