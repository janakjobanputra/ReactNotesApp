import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import './notelist.css'

function renderDate(updatedAt) {
    let d = dayjs(updatedAt);
    return d.format("MMMM D YYYY, HH:mm");
}

const Note = ({ note: { _id, title, body, updatedAt, tags } }) => (
    <div className="notes-list-item">
        <h2><Link to={`/notes/${_id}`}>{ title }</Link></h2>
        <span className="notes-list-date">
            { renderDate(updatedAt) }
        </span>
    </div>
);

export default ({ notes }) => (
    <div className="notes-list">
        <h2>All Notes</h2>
        {notes.map(n => <Note note={n} key={`note-${n._id}`}/> )}
    </div>
);