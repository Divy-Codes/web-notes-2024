import { useEffect, useState } from 'react';
import { actions, useNotes } from '../contextProvider/NotesProvider';
import './allFiles.scss';
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

export default function AllFiles({ notes = [], searchBar = false }) {
  const [, dispatch] = useNotes();
  const [del, setDel] = useState(0);

  function makeNewNote() {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled',
      body: '',
      tagIds: [],
    };
    dispatch({
      type: actions.ADD_NEW_NOTE,
      payload: newNote,
    });
    dispatch({ type: actions.SET_ACTIVE_NOTE, payload: newNote });
  }

  //Delete a Note Setup
  function deleteNote(id) {
    setDel((del) => del + 1);
    if (notes.length == 1) {
      makeNewNote();
    }
    dispatch({ type: actions.DELETE_NOTE, payload: { id } });
  }

  //We need to use useEffect if we want a realtime update of a site.
  useEffect(() => {
    dispatch({ type: actions.SET_ACTIVE_NOTE, payload: notes[0] });
  }, [del]);

  return (
    <div className='allFilesContainer'>
      {!searchBar ? (
        <div className='headingContainer'>
          <h2>Notes</h2>
          <button onClick={makeNewNote}>
            <FaPlus size={15} />
          </button>
        </div>
      ) : (
        ''
      )}
      <ul className='allFilesList'>
        {notes.map((note) => (
          <div className='noteFileContainer' key={note.id}>
            <li
              key={note.id}
              className='noteTitle'
              onClick={() =>
                dispatch({ type: actions.SET_ACTIVE_NOTE, payload: note })
              }
            >
              {note.title}
            </li>
            <span className='deleteIcon' onClick={() => deleteNote(note.id)}>
              <MdDelete size={17} />
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
