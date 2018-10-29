import React from 'react';
import { Link } from 'react-router-dom';

import ReactQuill from 'react-quill';

import './form.css'
import 'react-quill/dist/quill.snow.css';

export default class NewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            note: {
                title:'',
                body:'',
                createdAt:undefined,
                updatedAt:undefined
            },
            saving: false
        }
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }
    
    handleBodyChange(value) {
        const { note } = this.state;
        this.setState({
            note: { ...note, body: value}
         })
    }

    updateValue = (e) => {
        const { note } = this.state;
        this.setState({
            note: { ...note, [e.target.name]: e.target.value}
        });
    }

    handleSave = async(e) => {
        e.preventDefault();

        const id = await this.props.onSave(this.state.note);
        this.props.history.replace(`/notes/${id}`);
    }

    render(){
        const { note } = this.state;
        let reactQuillStyles = {
            height:'95%',
            width:'100%',
            padding:'10px',
        }
        let modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
          }
        let formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]

        return (
            <div className="note-form">
                <h1>New Note</h1>
                <form onSubmit={this.handleSave}>
                    <div className="note-form-field">
                        <label>Title</label>
                        <input type="text" name="title" value={note.title} onChange={this.updateValue} />
                    </div>
                    <div className="note-form-field note-form-field-text">
                        {/* <textarea name="body" value={note.body} onChange={this.updateValue}/> */}
                        <ReactQuill theme="snow" value={note.body} onChange={this.handleBodyChange} style={reactQuillStyles} modules={modules}
                    formats={formats}/>
                    </div>
                    <div className="note-form-buttons">
                        <button className="btn">Save</button>
                        <Link to={`/`}>Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}