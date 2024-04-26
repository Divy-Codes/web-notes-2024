import { useCallback, useEffect, useRef, useState } from 'react';
import './note.scss';
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
  const bodyRef = useRef();
  const titleRef = useRef();

  //The only way to submit this form is to press Enter on title. We want to jump to body when Enter is pressed.
  const tabToEnter = (e) => {
    e.preventDefault();
    bodyRef.current.focus();
  };

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
    localStorage.setItem('CONFIG', JSON.stringify({ activeNote }));
  }, [activeNote, title, body]);

  // =============================RETURN========================================
  return (
    <div className='noteContainer'>
      <div className='formContainer'>
        <form className='noteForm' onSubmit={tabToEnter}>
          <div className='noteTitleContainer'>
            <input
              type='text'
              name='noteTitle'
              id='noteTitle'
              placeholder='Title...'
              autoFocus
              required
              value={title}
              ref={titleRef}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            name='noteBody'
            id='noteBody'
            placeholder={`Write your Markdown note here... \nPress "Ctrl" + " ; " to view`}
            ref={bodyRef}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </form>
      </div>
    </div>
  );
}
