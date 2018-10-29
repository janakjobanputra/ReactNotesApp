import React from 'react';
import { Link } from 'react-router-dom';

import NoteList from '../components/notelist';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        let notes = Object.values(props.notes)
        notes.sort( (a,b) => new Date(b.updatedAt) - new Date(a.updatedAt) );

        this.state = { notes };
    }

    render() {
        let { notes } = this.state

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
                {/* <h1> Notes </h1> */}
                <NoteList notes={this.state.notes} />
            </div>
        )
    }
}