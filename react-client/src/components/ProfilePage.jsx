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
    this.props.fetch('user', this.state.username, (user) => {
      this.setState({
        userProfile: user,
      });
    });
  }

  handleSignup() {
    $.ajax({
      url: `/user/${this.state.username}`,
      type: 'POST',
      data: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        reviewedBooks: [],
        favoriteBooks: [],
      }),
      success: (data) => {
        if (data === 'success') {
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
      <input type="text" value={this.username} onChange={this.onChange} placeholder="Username" />
      <input type="password" value={this.password} onChange={this.onChange} placeholder="Password" />
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
