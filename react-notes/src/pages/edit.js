import React from 'react';
import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import ReactQuill from 'react-quill';

import './form.css'
import 'react-quill/dist/quill.snow.css';

export default class EditNotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags:[],
            note: {
                title: '',
                body: '',
                createdAt: null,
                updatedAt: null,
                tags:[]
            },
            saving: false
        }
        this.state.tags = this.state.note.tags
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
        // const { tags } = this.state;
        const { note } = this.state;
        this.setState({
            tags: note.tags.filter((tag, index) => index !== i),
            note: { ...note, tags: note.tags.filter((tag, index) => index !== i) }
        });
    }

    handleAdditionTag(tag) {
        const { note } = this.state;
        var concatTags = this.state.tags
        note.tags.forEach((tag) => {
            concatTags.push(tag)
        })
        this.setState(
            state => ({ 
                tags: [...note.tags, tag], 
                note:{ ...note, tags:[...note.tags, tag] } 
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

    async componentDidMount() {
        this.setState({ note: {...this.props.note} });
    }

    async handleSave() {
        this.setState({ saving: true});

        const res = await this.props.onSave({ ...this.state.note });

        this.props.history.replace(`/notes/${res.id}`)
    }

    updateValue(e) {
        let { note } = this.state;
        console.log("note updated", note)
        this.setState({ note: { ...note, [e.target.name]: e.target.value } });
    }

    render() {
        if(this.state.loading) {
            return <h2> Loading... </h2>
        }

        const { note } = this.state;
        // const { tags } = this.state;
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
                <h1> Edit Note </h1>
                <form onSubmit={(e) => { e.preventDefault(); this.handleSave(); }}>
                    <div className="note-form-field">
                        <label>Title</label>
                        <input type="text" name="title" value={note.title} onChange={(e) => this.updateValue(e)}  autoFocus/>
                    </div>
                    <ReactTags tags={note.tags} handleDelete={this.handleDeleteTag} handleAddition={this.handleAdditionTag} handleDrag={this.handleDragTag} allowUnique={true} autofocus={false}/>
                    <div className="note-form-field note-form-field-text">
                        {/* <textarea name="body" value={note.body} onChange={(e) => this.updateValue(e)} /> */}
                        <ReactQuill theme="snow" value={note.body} onChange={this.handleBodyChange} style={reactQuillStyles} modules={modules}
                    formats={formats}/>
                    </div>
                    <div className="note-form-buttoms">
                        <input type="submit" value="Save" />
                        <Link to={`/notes/${note.id}`}>Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }

}