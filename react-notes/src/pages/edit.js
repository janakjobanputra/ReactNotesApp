import React from 'react';
import { Link } from 'react-router-dom';

import ReactQuill from 'react-quill';

import './form.css'
import 'react-quill/dist/quill.snow.css';

export default class EditNotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: {
                title: '',
                body: '',
                createdAt: null,
                updatedAt: null
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

        this.setState({ note: { ...note, [e.target.name]: e.target.value } });
    }

    render() {
        if(this.state.loading) {
            return <h2> Loading... </h2>
        }

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
                <h1> Edit Note </h1>
                <form onSubmit={(e) => { e.preventDefault(); this.handleSave(); }}>
                    <div className="note-form-field">
                        <label>Title</label>
                        <input type="text" name="title" value={note.title} onChange={(e) => this.updateValue(e)} />
                    </div>
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