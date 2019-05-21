import React from "react";
import PropTypes from "prop-types";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography
} from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courtsNum: 6
    };
  }

  componentDidMount() {
    fetch("/api/courts")
      .then(response => response.json())
      .then(data => {
        this.setState({ message: data.message });
      });
  }

  render() {
    // const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              Court Booking System
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper>
          <Grid container direction="row" justify="center" spacing={24}>
            <Grid item>
              <CourtsTable />
            </Grid>
            <Grid item>
              <Statistics />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

class CourtsTable extends React.Component {
  createRow() {
    const hours = Array.from(Array(16), (x, idx) => idx + 6);
    return (
      <Grid container direction="row">
        {hours.map(h => (
          <Button variant="contained">
            {h}-{h + 1}
          </Button>
        ))}
      </Grid>
    );
  }
  render() {
    const courtsNum = [1, 2, 3, 4, 5, 6];
    return (
      <Grid container direction="column">
        {courtsNum.map(num => (
          <Grid container>
            <Typography variant="h6" color="inherit">
              Court {num}
            </Typography>
            {this.createRow()}
          </Grid>
        ))}
      </Grid>
    );
  }
}

class Statistics extends React.Component {
  render() {
    return <h1>statystyki</h1>;
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
