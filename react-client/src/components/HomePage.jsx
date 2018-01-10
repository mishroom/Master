import React from 'react';
// import ReactDOM from 'react-dom';
// import $ from 'jquery';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      bestSellerBooks: ''
      };
    this.getBestSellersBooks = this.getBestSellersBooks.bind(this);

  }

  componentDidMount() {
  };


  getBestSellersBooks() {

    $.ajax({
      url: '/bestSellers',
      type: 'GET',
      })
      .done(function(result) {
      console.log("on line 26 in Hompepage", result.results);
      this.setState({
        bestSellerBooks: result.results
      });
    }).fail(function(err) {
      throw err;
    });


  }

  render() {
    return (
      <div>

      <h1 >LiteraryLitten: The Rotten Tomatoes for Books</h1>
      <div className="bookImages"> {this.state.bestSellerBooks[0]} {this.state.bestSellerBooks[1]} {this.state.bestSellerBooks[2]}</div>
      <div className="bookTitle" >     stars: </div>
      <div className="bookAuthor" >      </div>
      <div className="bookGenre" >      </div>
      <div className="description">     </div>

    </div>)

  }
}

export default HomePage;
