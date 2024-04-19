import { actions, useNotes } from '../contextProvider/NotesProvider';
import './allFiles.scss';
import { FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export default function AllFiles({ notes = [], searchBar = false }) {
  console.log(`searchBar:`, searchBar);

  const [, dispatch] = useNotes();

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
          <li
            key={note.id}
            className='noteTitle'
            onClick={() =>
              dispatch({ type: actions.SET_ACTIVE_NOTE, payload: note })
            }
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
