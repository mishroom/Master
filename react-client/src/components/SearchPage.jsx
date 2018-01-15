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

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };

    this.createBook = this.createBook.bind(this);
  }

  createBook(searchResult) {
    let book = {};
    book.title = searchResult.best_book.title._text;
    book.author = searchResult.best_book.author.name._text;
    book.imageURL = searchResult.best_book.image_url._text;
    return book;
  }

  render() {
    this.props.fetch('search', this.props.searchedBook, (results) => {
      this.setState({
        searchResults: results,
      });
    });
    // console.log(this.state.searchResults);

    return (
      <div>
      SEARCH PAGE WOOH <br />
        {this.state.searchResults.map(book => (
          <BookCard book={this.createBook(book)} />))}
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
