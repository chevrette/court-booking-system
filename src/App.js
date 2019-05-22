import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20
  },
  backDrop: {
    backgroundColor: "transparent"
  },
  paper: {
    backgroundColor: "#f5f5f5",
    boxShadow: "none",
    overflow: "hidden"
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      dialogOpen: false,
      from: 0,
      to: 0,
      courtNum: 0
    };
    this.saveReservation = this.saveReservation.bind(this);
    this.isAvailable = this.isAvailable.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  componentWillMount() {
    axios
      .get("/api/courts")
      .then(response => {
        this.setState({ reservations: response.data });
      })
      .catch(() => {
        console.log("Can't access to api/courts");
      });
  }

  openDialog = (from, to, courtNum) => {
    this.setState({
      from: from,
      to: to,
      courtNum: courtNum,
      dialogOpen: true
    });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  saveReservation = (owner, from, to, courtNum) => {
    axios
      .post(`/api/courts/${courtNum}/reservations`, {
        from: from,
        to: to,
        owner: owner
      })
      .then(response => {
        const reservations = [...this.state.reservations];
        const indexToReplace = reservations.findIndex(
          element => element.id === courtNum
        );
        reservations[indexToReplace] = response.data;
        this.setState({ reservations });
      })
      .catch(() => {
        console.log("Can't make reservation");
      })
      .then(() => {
        this.closeDialog();
      });
  };

  isAvailable(from, to, courtNum) {
    if (this.state.reservations.length === 0) {
      return true;
    }

    const overlapped = this.state.reservations[courtNum].reservations.filter(
      r => !((from >= r.to && to > r.to) || (from < r.from && to <= r.from))
    );
    return overlapped.length === 0;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <h2>Court Booking System</h2>
          </Toolbar>
        </AppBar>
        <Paper>
          <Grid container direction="row" justify="center" spacing={24}>
            <Grid item>
              <CourtsTable
                classes={classes}
                openDialog={this.openDialog}
                isAvailable={this.isAvailable}
              />
            </Grid>
            <Grid item>
              <Statistics
                classes={classes}
                reservations={this.state.reservations}
              />
            </Grid>
            <ReservationDialog
              show={this.state.dialogOpen}
              classes={classes}
              onClose={this.closeDialog}
              onSave={this.saveReservation}
              from={this.state.from}
              to={this.state.to}
              courtNum={this.state.courtNum}
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

class CourtsTable extends React.Component {
  render() {
    const courtsNum = [...Array(6).keys()];
    const hours = Array.from(Array(16), (x, idx) => idx + 6);
    return (
      <Grid container direction="column">
        <h1>Reservations</h1>
        {courtsNum.map(num => (
          <Grid container key={num}>
            <Typography variant="h6" color="inherit">
              Court {num}
            </Typography>
            <Grid container direction="row">
              {hours.map(h => (
                <ReservationButton
                  key={`${num}-${h}`}
                  onClick={this.props.openDialog}
                  from={h}
                  to={h + 1}
                  courtNum={num}
                  isFree={this.props.isAvailable(h, h + 1, num)}
                />
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}

class ReservationButton extends React.Component {
  render() {
    return (
      <Button
        variant="contained"
        color={this.props.isFree ? "default" : "secondary"}
        onClick={() => {
          if (this.props.isFree) {
            this.props.onClick(
              this.props.from,
              this.props.to,
              this.props.courtNum
            );
          }
        }}
        style={{ width: "15px", margin: "0.2em" }}
      >
        {this.props.from}-{this.props.to}
      </Button>
    );
  }
}

class ReservationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ owner: event.target.value });
  }

  render() {
    return (
      <Dialog
        open={this.props.show}
        onClose={this.props.onClose}
        BackdropProps={{
          classes: {
            root: this.props.classes.backDrop
          }
        }}
        PaperProps={{
          classes: {
            root: this.props.classes.paper
          }
        }}
      >
        <DialogTitle>Make reservation</DialogTitle>
        <DialogContent>
          <Typography>court number: {this.props.courtNum}</Typography>
          <Typography>
            hours: {this.props.from}-{this.props.to}
          </Typography>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.onSave(
                this.state.owner,
                this.props.from,
                this.props.to,
                this.props.courtNum
              );
              this.setState({ owner: "" });
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container direction="column">
              <TextField
                id="owner"
                label="Your name"
                value={this.state.owner}
                onChange={this.handleChange}
              />
              <Grid container direction="row">
                <Button type="submit" color="primary" style={{ margin: "1em" }}>
                  Book
                </Button>
                <Button
                  onClick={this.props.onClose}
                  color="primary"
                  style={{ margin: "1em" }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: this.props.reservations
    };
    // const numOfCourts = 6;
  }

  courtsAvailability() {}

  render() {
    return (
      <Grid container direction="column">
        <h1>Statistics</h1>
      </Grid>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);

// klik -> jesli wolny to popup z danymi rezerwacji i
// inputem na imie -> zrobienie puta do routera ->
// zmiana koloru kortu

// zmiana koloru: makeRes powinno zwrócic true/false i na podstawie
// tego button ustawia kolor
