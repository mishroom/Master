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
      book: {},
    };

    this.createBook = this.createBook.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let searchCards = [];
    searchCards = this.props.searchResults.map((book) => {
      return this.createBook(book);
    });
    console.log(searchCards);
    this.setState({ searchCards: searchCards });
  }

  createBook(searchResult) {
    let book = {
      title: searchResult.best_book.title._text,
      author: searchResult.best_book.author.name._text,
      imageURL: searchResult.best_book.image_url._text,
    };
    return book;
  }

  render() {

    // console.log(this.state.searchResults);
    console.log(this.state);
    console.log(this.props);

    return (
      <div>
      <h2>SEARCH RESULTS</h2> <br />
        
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
