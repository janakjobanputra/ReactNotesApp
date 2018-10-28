import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar';

import IndexPage from './pages';
import ShowPage from './pages/show';
import NewPage from './pages/new';
import EditPage from './pages/edit';

import DB from './db';

class App extends Component {
  constructor(props) {
    super(props);
    let db = new DB();
    this.state={
      db,
      notes: {},
      loading: true
    }
  }
  state = {
    db: new DB(),
    notes: {},
    loading: true
  }

  async componentDidMount() {
    const notes = await this.state.db.getAllNotes();

    this.setState({
      notes,
      loading: false
    })
  }

  handleSave = async (note, method) => {
    let res = await this.state.db[method](note);
    let { notes } = this.state;

    note._id = res.id;
    note._rev = res.rev;

    // const { notes } = this.state;

    this.setState({
      notes: { ...notes, [res.id]: note }
    });

    return res;
  }

  renderContent() {
    if(this.state.loading) {
      return <h2>Loading...</h2>
    }

    return (
      <div className="app-content">
        <Route exact path='/' component={(props) => <IndexPage {...props} notes={this.state.notes} />} />
        <Route exact path='/notes/:id' component={(props) => (
          <ShowPage {...props} note={this.state.notes[props.match.params.id]} onDelete={(id) => this.handleDelete(id) } />
        )} />
        <Route exact path='/notes/:id/edit' component={(props) => (
          <EditPage {...props} note={this.state.notes[props.match.params.id]} onSave={(note) => this.handleSave(note, 'updateNote') } />
        )} />
        <Route exact path='/new' component={(props) => (
          <NewPage {...props} onSave={(note) => this.handleSave(note, 'createNote')} />
        )} />
      </div>
    )
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          { this.renderContent() }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
