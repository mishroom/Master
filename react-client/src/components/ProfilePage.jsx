import React from 'react';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

  }

  onChange() {
    this.setState({ username: this.username, password: this.password });
  }

  handleLogin() {
    this.props.fetch('user', this.state.username, (user) => {
      this.setState({
        userProfile: user,
      });
    });
  }

  handleSignup() {

  }


  render() {
    return (
      <div>
        <div className='login'>
          <label>
          Login
          </label>
          <input type="text" value={this.username} onChange={this.onChange} />
          <input type="text" value={this.password} onChange={this.onChange} />
          <button onClick={this.handleLogin} > Login </button>
        </div>
        <div className='signup'>
          <label>
          Signup
          </label>
          <input type="text" value={this.username} onChange={this.onChange} />
          <input type="text" value={this.password} onChange={this.onChange} />
          <button onClick={this.handleSignup} > Signup </button>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
