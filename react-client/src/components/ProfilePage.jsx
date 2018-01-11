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
        console.log(data);
        if (data.type === 'success') {
          alert('Login Success');
        } else if (data.type === 'wrong password') {
          alert('Wrong Password: Try Again');
        } else {
          alert ('Cannot find username: Try Again');
        }
      },
      error: (err) => {
        console.log('err', err);
      },
    });
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


  render() {
    return (
      <div>
      <div className='login'>
      <label>
      Login
      </label>
      <input type="text" value={this.username} onChange={this.saveUsername} placeholder="Username" />
      <input type="password" value={this.password} onChange={this.savePassword} placeholder="Password" />
      <button onClick={this.handleLogin} > Login </button>
      </div>
      <div className='signup'>
      <label>
      Signup
      </label>
      <input type="text" value={this.name} onChange={this.saveName} placeholder="Name" />
      <input type="text" value={this.username} onChange={this.saveUsername} placeholder="Username" />
      <input type="password" value={this.password} onChange={this.savePassword} placeholder="Password" />
      <button onClick={this.handleSignup} > Signup </button>
      </div>
      </div>
      );
  }
}

export default ProfilePage;
