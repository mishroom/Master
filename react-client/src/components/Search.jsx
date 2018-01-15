import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import SearchPage from './SearchPage.jsx';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // bind the fetch callback to this component
  // accept a callback that returns the isbn of the first result or the selected one to APP
  // the CB will set the state of the currentbook in the APP and trigger a re-render of the book page

  onChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  handleSubmit() {
    console.log('clicked', this.state.query);
    // this.props.fetch('search', this.state.query, (book) => {
    //   this.setState({
    //     selectedBook: book,
    //   });
    // });
    this.props.handleSearch();
  }

  render() {
    const { classes } = this.props;

    return (
      <span>
        <Button
          raised
          dense
          color="contrast"
          className={classes.button}
          disabled={this.state.query.length < 1}
          onClick={this.handleSubmit}
        >
          {this.state.query.length < 1 ? '' : 'Search'}
        </Button>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Search"
          margin="normal"
          onChange={this.onChange}
        />
      </span>
    );
  }
}

export default withStyles(styles)(Search);
