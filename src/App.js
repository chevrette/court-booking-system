import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/hello')
            .then(response => response.json())
            .then((data) => {
              this.setState({ message: data.message });
            });
  }

  render() {
    return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                {this.state.message}
              </header>
            </div>
    );
  }
}

export default App;
