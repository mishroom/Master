import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import List from './components/List.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import BookPage from './components/BookPage.jsx';
import HomePage from './components/HomePage.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      items: [],
      userProfile: [],
      selectedBook: [],
    };
    this.changeView = this.changeView.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    // example load user by userName
    this.fetch('user', 'dust_off', (user) => {
      this.setState({
        userProfile: user,
      });
    });

    // example fetch from library by ISBN
    this.fetch('book', '1234567890', (book) => {
      this.setState({
        selectedBook: book,
      });
    });

    // Search Example //ALSO works with ISBN: 0316769177
    // this.fetch('search', 'Catcher in the Rye', (search) => {
    //   // console.log(search);
    // });
  }

  fetch(thing, id, cb) {
    // console.log('FETCH');
    $.ajax({
      url: `/${thing}/${id}`,
      success: (data) => {
        cb(data);
      },
      error: (err) => {
        console.log('err', err);
        // console.log(this.state.selectedBook);
      },
    });
  }

  changeView(event) {
    let choice;
    if (event.target.value) {
      choice = event.target.value;
    } else {
      choice = event;
    }
    this.setState({
      view: choice,
    });
  }

  renderView() {
    if (this.state.view === 'Book') {
      return (
        <BookPage
          book={this.state.selectedBook}
          changeView={this.changeView}
          fetch={this.fetch}
        />
      );
    } else if (this.state.view === 'Profile') {
      return (
        <ProfilePage
          props="test"
          fetch={this.fetch}
          changeView={this.changeView}
        />
      );
    }
    return (
      <HomePage
        props="test"
        changeView={this.changeView}
      />
    );
  }

  render() {
    return (
      <div>
        <Search fetch={this.fetch} />
        <div className="selections">
        Test Pages:
          <select onChange={this.changeView}>
            <option>Null</option>
            <option>Profile</option>
            <option>Book</option>
          </select>
        </div>


        <div className="main-view">
          {this.renderView()}
        </div>

      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
