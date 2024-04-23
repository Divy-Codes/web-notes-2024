import { useCallback, useEffect, useRef, useState } from 'react';
import './note.scss';
import { pressEntertoFocusOn } from '../../utils/helperMethods';
import { actions } from '../contextProvider/NotesProvider';
import { useNotes } from '../contextProvider/NotesProvider';

export default function Note() {
  const [
    {
      notes,
      tags,
      config: { activeNote },
    },
    dispatch,
  ] = useNotes();
  const [title, setTitle] = useState(activeNote?.title || 'Untitled');
  const [body, setBody] = useState(activeNote?.body || '');
  const [noteId, setNoteId] = useState(activeNote?.id || null);
  const titleRef = useRef();
  const bodyRef = useRef();

  //Update the contents to be rendered when activeNote changes.
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setBody(activeNote.body);
      setNoteId(activeNote.id);
    }
  }, [activeNote, tags]);

  //tag = {label:'...' , id: '...'}
  //react-select tag: {label:'...' , value: '...' }

  const saveNote = useCallback(() => {
    if (title.trim().length > 0) {
      const savedNote = {
        id: noteId,
        title,
        body,
      };

      dispatch({
        type: actions.SAVE_NOTE,
        payload: savedNote,
      });

      dispatch({
        type: actions.SET_ACTIVE_NOTE,
        payload: savedNote,
      });
    }
  }, [body, dispatch, noteId, title]);

  //Save title
  const saveTitle = (e) => {
    setTitle(e.target.value);
  };

  //Save Body
  const saveBody = (e) => {
    setBody(e.target.value);
  };

  //Auto Save with debouncing
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      saveNote();
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, [title, body]);

  //=========================SAVING ITEMS TO LOCAL STORAGE=========================

  //Update localStorage when notes change
  useEffect(() => {
    localStorage.setItem('NOTES', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    // localStorage.setItem('CONFIG', JSON.stringify({ activeNote }));
    localStorage.setItem('CONFIG', JSON.stringify({ activeNote })); //New addition
  }, [activeNote, title, body]);

  // =============================RETURN========================================
  return (
    <div className='noteContainer'>
      <div className='formContainer'>
        <form className='noteForm'>
          <div className='noteTitleContainer'>
            <input
              type='text'
              name='noteTitle'
              id='noteTitle'
              placeholder='Title...'
              ref={titleRef}
              required
              value={title}
              onChange={saveTitle}
              //Pressing enter would work like tab
              onFocus={(e) => pressEntertoFocusOn(e, bodyRef.current)}
            />
          </div>
          <textarea
            name='noteBody'
            id='noteBody'
            placeholder='Write your note here...'
            ref={bodyRef}
            required
            value={body}
            onChange={saveBody}
            // cols='15'
            // rows='1'
          ></textarea>
        </form>
      </div>
    </div>
  );
}

//Save the note by pressing Ctrl + ALt + v
// useEffect(() => {
//   const saveForm = (e) => {
//     if (e.ctrlKey && e.altKey && e.key == 'b') {
//       e.stopPropagation();
//       console.log(`form saved`);
//       // saveNote.current.dispatchEvent(new CustomEvent('click'));
//     }
//   };

//   const debouncedSaveForm = debounce(saveForm);

//   window.addEventListener('keydown', debouncedSaveForm);
//   return () => window.removeEventListener('keydown', debouncedSaveForm);
// }, []);
