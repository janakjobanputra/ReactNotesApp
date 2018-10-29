import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input';
import NoteList from '../components/notelist';

const KEYS_TO_FILTERS = ['tags.text']

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        let notes = Object.values(props.notes)
        notes.sort( (a,b) => new Date(b.updatedAt) - new Date(a.updatedAt) );

        this.state = { 
            notes, 
            searchTerm:''
        };
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }

    render() {
        let { notes } = this.state
        const filteredNotes = notes.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        if(!notes.length) {
            return (
                <div className="app-intro">
                    <h2> There are no notes to search! </h2>
                </div>
            )
        }
        
        return(
            <div>
                <h1>Search By Tag</h1>
                <div className="note-form-field">
                    <SearchInput className="search-input" onChange={this.searchUpdated} />
                    <NoteList notes={filteredNotes} />
                </div>
            </div>
        )
    }
}