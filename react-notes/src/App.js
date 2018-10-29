import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar';

import IndexPage from './pages';
import ShowPage from './pages/show';
import NewPage from './pages/new';
import EditPage from './pages/edit';
import SearchPage from './pages/search';
import NewFolderPage from './pages/newfolder';

import DB from './db';

class App extends Component {
  constructor(props) {
    super(props);

    let db = new DB();
    this.state = { 
      db,
      notes: {},
      folders: {},
      loading: true
    };
    this.handleDeleteAll = this.handleDeleteAll.bind(this)
  }

  async componentDidMount() {
    const notes = await this.state.db.getAllNotes();
    const folders = await this.state.db.getAllFolders();

    this.setState({
      notes,
      loading: false
    });
  }

  async handleSave(thing, method, isNote) {
    if(!thing.title) {
      console.log("returning, no title");
      return;
    }

    console.log("saving thing", thing, method)

    let res = await this.state.db[method](thing);
    if(isNote) {
      let { notes } = this.state;
      thing._id = res.id;
      thing._rev = res.rev;
      this.setState({
        notes: { ...notes, [res.id]: thing }
      });
    } else {
      let { folders } = this.state;
      thing._id = res.id;
      thing._rev = res.rev;
      console.log("res", res, thing)
      this.setState({
        folders: { ...folders, [res.id]: thing }
      });
    }

    return res;
  }

  async handleDelete(id) {
    let { notes } = this.state;
    let note = notes[id];

    if(notes[id] && window.confirm('Are you sure you want to delete this note?')) {
      await this.state.db.deleteNote(note);

      delete notes[id];

      this.setState({ notes });
    }
  }

  async handleDeleteAll() {
    console.log("deleting All", this)
    let { notes } = this.state;
    await this.state.db.deleteAll();
    notes = {};
    this.setState({ notes });
  }

  renderContent() {
    if(this.state.loading) {
      return <h2>Loading...</h2>
    }

    return (
      <div className="app-content">
        <Route exact path='/' component={(props) => (
          <IndexPage {...props} notes={this.state.notes} folders={this.state.folders}/>
        )} />
        <Route exact path='/notes/:id' component={(props) => (
          <ShowPage {...props} note={this.state.notes[props.match.params.id]} onDelete={(id) => this.handleDelete(id) } />
        )} />
        <Route exact path='/notes/:id/edit' component={(props) => (
          <EditPage {...props} note={this.state.notes[props.match.params.id]} onSave={(note) => this.handleSave(note, 'updateNote', true) } />
        )} />
        <Route exact path='/new' component={(props) => (
          <NewPage {...props} onSave={(note) => this.handleSave(note, 'createNote', true)} />
        )} />
        <Route exact path='/search' component={(props) => (
          <SearchPage {...props} notes={this.state.notes} />
        )} />
        <Route exact path='/newfolder' component={(props) => (
          <NewFolderPage {...props} onSave={(folder) => this.handleSave(folder, 'createFolder', false)} />
        )} />
      </div>
    )
  }

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Navbar deleteAll={this.handleDeleteAll} notes={this.state.notes} />
            { this.renderContent() }
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
