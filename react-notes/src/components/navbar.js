import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        let notes = Object.values(props.notes)
        this.state = {
            notes
        }
    }

    render() {
        return (
            <nav className="navbar">
                <h1><Link to="/">ReactNotes</Link></h1>
                <div className="navbar-buttons">
                    <Link to="/new" className="btn">New Note</Link>
                    <Link to="/" className="btn" onClick={ (e) => this.props.deleteAll()}>Delete All</Link>
                </div>
            </nav>
        )
    }
}