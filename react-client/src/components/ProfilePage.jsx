import React from 'react';
import $ from 'jquery';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      username: '',
      password: '',
      name: '',
      loginSuccess: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.saveName = this.saveName.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
  }

  saveName(e) {
    this.setState({ name: e.target.value });
  }
  saveUsername(e) {
    this.setState({ username: e.target.value });
  }
  savePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin() {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      success: (data) => {
        if (data.type === 'success') {
          this.setState({ userProfile: data.userProfile });
        } else if (data.type === 'wrong password') {
          alert('Wrong Password: Try Again');
        } else {
          alert ('Invalid username: Try Again');
        }
        this.renderView();
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  handleLogout() {
    this.setState({ userProfile: [] });
    this.renderView();
  }

  handleSignup() {
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        reviewedBooks: [],
        favoriteBooks: [],
      }),
      success: (data) => {
        console.log(data);
        if (data.type === 'success') {
          alert('User Profile Created! Login to continue');
        } else{
          alert('Oh no! That username is already taken. Try again!');
        }
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  changePassword() {
    // render a text box
    // go to server > db
    // edit pw field in db
    // return new user object
    // rerender page

  }

  renderView() {
    if (this.state.userProfile.length === 0) {
      return (
        <div>
          <div className="login">
            <label>
              Login
            </label>
            <input
              type="text"
              value={this.username}
              onChange={this.saveUsername}
              placeholder="Username"
            />
            <input
              type="password"
              value={this.password}
              onChange={this.savePassword}
              placeholder="Password"
            />
            <button onClick={this.handleLogin} > Login </button>
          </div>
          <div className="signup">
            <label>
              Signup
            </label>
            <input
              type="text"
              value={this.name}
              onChange={this.saveName}
              placeholder="Name"
            />
            <input
              type="text"
              value={this.username}
              onChange={this.saveUsername}
              placeholder="Username"
            />
            <input
              type="password"
              value={this.password}
              onChange={this.savePassword}
              placeholder="Password"
            />
            <button onClick={this.handleSignup} > Signup </button>
          </div>
        </div>
      );
    } else {
      let user = this.state.userProfile;
      return (
        <div className="userProfile">
          USER LOGGED IN YO
          <div className="name">
            Name : {user.name} <br />
            Username : {user.username} <br />
            <button onClick={this.changePassword} > Change Password </button> <br />
            My Bookshelf : {user.favoriteBooks} <br />
            My Reviews : {user.reviewedBooks}
          </div>
          {this.state.userProfile.username}
          <button onClick={this.handleLogout} > Logout </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    );
  }
}

export default ProfilePage;
