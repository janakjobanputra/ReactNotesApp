import PouchDB from 'pouchdb';

export default class DB {
    constructor(name) {
        this.notesDb = new PouchDB('react-notes');
        this.folderDb = new PouchDB('react-folders');
    }

    //All Folder Functions
    async getAllFolders() {
        let allFolders = await this.folderDb.allDocs({ include_docs: true});
        let folders = {};

        allFolders.rows.forEach(f => folders[f.id] = f.doc)

        return folders;
    }

    async createFolder(folder) {
        folder.createdAt = new Date();
        folder.updatedAt = new Date();
        console.log("creating folder", folder)
        const res = await this.folderDb.post({ ...folder });
        return res
    }

    //All Notes Functions
    async getAllNotes() {
        let allNotes = await this.notesDb.allDocs({ include_docs: true});
        let notes = {};

        allNotes.rows.forEach(n => notes[n.id] = n.doc)

        return notes;
    }

    async createNote(note) {
        note.createdAt = new Date();
        note.updatedAt = new Date();

        const res = await this.notesDb.post({ ...note });
        
        return res
    }

    async updateNote(note) {
        note.updatedAt = new Date();

        const res = await this.notesDb.put({ ...note });
        return res;
    }

    async deleteNote(note) {
        await this.notesDb.remove(note);
    }

    async deleteAll() {
        await this.notesDb.destroy()
        console.log("deleted all notes")
        this.notesDb = new PouchDB('react-notes');
        this.folderDb = new PouchDB('react-folders');
    }
}