import React from 'react';
import { Link } from 'react-router-dom';

import './form.css'

export default class NewFolderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            folder:{
                title:'',
                notes:[],
                createdAt:undefined,
                updatedAt:undefined
            },
            saving: false
        }
    }

    updateValue = (e) => {
        const { folder } = this.state;

        this.setState({
            folder: { ...folder, [e.target.name]: e.target.value}
        });
    }

    handleSave = async(e) => {
        e.preventDefault();

        const id = await this.props.onSave(this.state.folder);
        console.log("got id", id)
        this.props.history.replace(`/folders/${id.id}`);
    }

    render() {
        const { folder } = this.state;
        return(
            <div className="note-form">
                <h1>New Folder</h1>
                <form onSubmit={this.handleSave}>
                    <div className="note-form-field">
                        <label>Folder Name</label>
                        <input type="text" name="title" value={folder.title} onChange={this.updateValue} autoFocus/>
                    </div>
                    <div className="note-form-buttons">
                        <button className="btn">Save</button>
                        <Link to={`/`}>Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}