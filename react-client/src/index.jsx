import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
// import ProfilePage from './components/ProfilePage.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      userProfile: []
    }
  }

  componentDidMount() {
    this.findUser('dust_off', (user)=> {
      this.setState({
        userProfile: user
      })
    })
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  findUser(user, cb) {
    $.ajax({
      url: `/user/${user}`,
      success: (data) => {
        cb(data)
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <Search />
      <h1>Item List: {this.state.userProfile.name}</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
