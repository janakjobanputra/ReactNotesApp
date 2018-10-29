import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import './notelist.css'

function renderDate(updatedAt) {
    let d = dayjs(updatedAt);
    return d.format("MMMM D YYYY, HH:mm");
}

const Folder = ({ folder: { _id, title, updatedAt } }) => (
    <div className="notes-list-item">
        <h2><Link to={`/folder/${_id}`}>{ title }</Link></h2>
        <span className="notes-list-date">
            { renderDate(updatedAt) }
        </span>
    </div>
);

export default ({ folders }) => (
    <div className="notes-list">
        <h2>Folders</h2>
        {folders.map(f => <Folder note={f} key={`folder-${f._id}`}/> )}
    </div>
);