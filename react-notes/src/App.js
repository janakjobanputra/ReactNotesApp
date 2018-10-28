import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar';

import IndexPage from './pages/index';
import ShowPage from './pages/show';
import NewPage from './pages/new';

class App extends Component {
  state = {
    notes: {
      1: {
        _id:1,
        title: "Hello World",
        body: "This is the body of my note",
        udpatedAt: new Date()
      },
      2: {
        _id:2,
        title: "Note #2",
        body: "note #2",
        udpatedAt: new Date()
      },
    }
  }

  handleSave = (note) => {
    const ids = Object.keys(this.state.notes);
    const id = Math.max(...ids)+1;

    note['_id'] = id;

    const { notes } = this.state;

    this.setState({
      notes: {
        ...notes,
        [id]: note
      }
    });

    return id;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="app-content">
            <Route exact path='/' component={(props) => <IndexPage {...props} notes={this.state.notes} />} />
            <Route exact path='/notes/:id' component={(props) => <ShowPage {...props} note={this.state.notes[props.match.params.id]} /> } />
            <Route exact path='/new' component={(props) => <NewPage {...props} onSave={this.handleSave}/>} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
