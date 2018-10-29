import React from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';
import dayjs from 'dayjs';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';

import './show.css';

export default class ShowPage extends React.Component {
    renderDate() {
        let d = dayjs(this.props.note.updatedAt)
        return d.format("MMMM D YYYY, HH:mm")
    }

    componentWillMount() {
        if(!this.props.note) {
            this.props.history.replace(`/`);
            return;
        }
    }

    render(){
        const {note} = this.props;

        if(!note) { return null; }

        return (
            <div>
                <h1>{note.title}</h1>
                <div className="note-created">
                    {this.renderDate()}
                    <Link className="note-edit" to={`/notes/${note._id}/edit`}>Edit</Link>
                    <button className="btn" onClick={ (e) => this.props.onDelete(note._id)}>Delete</button>
                </div>
                <ReactTags tags={note.tags} readOnly={true}/>
                <div className="note-body" dangerouslySetInnerHTML={ {__html: marked(note.body) } } />
            </div>
        );
    }
}