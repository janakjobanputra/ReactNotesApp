import React from 'react';
import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import ReactQuill from 'react-quill';

import './form.css'
import 'react-quill/dist/quill.snow.css';

export default class NewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            tags:[],
            note: {
                title:'',
                body:'',
                createdAt:undefined,
                updatedAt:undefined,
                tags:[]
            },
            saving: false
        }
        //React Quill Linking
        this.handleBodyChange = this.handleBodyChange.bind(this);

        //React Tags Linking
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
        this.handleAdditionTag = this.handleAdditionTag.bind(this);
        this.handleDragTag = this.handleDragTag.bind(this);
    }
    
    handleBodyChange(value) {
        const { note } = this.state;
        this.setState({
            note: { ...note, body: value}
         })
    }

    handleDeleteTag(i) {
        const { tags } = this.state;
        const { note } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
            note: { ...note, tags: tags.filter((tag, index) => index !== i) }
        });
    }

    handleAdditionTag(tag) {
        const { note } = this.state;
        this.setState(
            state => ({ 
                tags: [...state.tags, tag], 
                note:{ ...note, tags:[...state.tags, tag] } 
            })
        );
    }

    handleDragTag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
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
        const { tags } = this.state;
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
                        <input type="text" name="title" value={note.title} onChange={this.updateValue} autoFocus/>
                    </div>
                    <ReactTags tags={tags} handleDelete={this.handleDeleteTag} handleAddition={this.handleAdditionTag} handleDrag={this.handleDragTag} allowUnique={true} autofocus={false}/>
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