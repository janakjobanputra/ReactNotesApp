import React from 'react';
import { Link } from 'react-router-dom';

import NoteList from '../components/notelist';
import FolderList from '../components/folderlist';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        let notes = Object.values(props.notes);
        notes.sort( (a,b) => new Date(b.updatedAt) - new Date(a.updatedAt) );
        let folders = Object.values(props.folders);
        folders.sort( (a,b) => new Date(b.updatedAt) - new Date(a.updatedAt) );

        this.state = { notes, folders };
    }

    render() {
        let { notes, folders } = this.state

        if(!notes.length) {
            return (
                <div className="app-intro">
                    <h2> Welcome to Simple Notes </h2>
                    <p> You don't have any notes. <Link className="btn" to="/new">Get Started!</Link> </p>
                </div>
            )
        }

        return(
            <div>
                <FolderList folders={this.state.folders} />
                <NoteList notes={this.state.notes} />
            </div>
        )
    }
}