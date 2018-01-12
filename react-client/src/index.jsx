import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

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
  }

  componentDidMount() {
  }

  fetch(thing, id, cb) {
    $.ajax({
      url: `/${thing}/${id}`,
      success: (data) => {
        cb(data);
      },
      error: (err) => {
        console.log('err', err);

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
        fetch={this.fetch}
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
