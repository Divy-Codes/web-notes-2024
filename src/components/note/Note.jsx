import { useEffect, useRef, useState } from 'react';
import './note.scss';
import { pressEntertoFocusOn } from '../../utils/helperMethods';
import { actions } from '../contextProvider/NotesProvider';
import { useNotes } from '../contextProvider/NotesProvider';
import SelectTags from '../selectTags/SelectTags';

export default function Note() {
  const [
    {
      notes,
      tags,
      config: { activeNote },
    },
    dispatch,
  ] = useNotes();
  const [title, setTitle] = useState(activeNote.title || 'Untitled');
  const [body, setBody] = useState(activeNote.body || '');
  const [selectedTags, setSelectedTags] = useState([]);
  const [noteId, setNoteId] = useState(activeNote.id || null);
  const titleRef = useRef();
  const bodyRef = useRef();

  useEffect(() => {
    console.log(`noteID:`, noteId);
  }, [noteId]);

  //We will be rendering the activeNote. So Update contents of current Note(being rendered) when we have an activeNote.
  useEffect(() => {
    if (activeNote) {
      console.log(`activeNote:`, activeNote);

      setTitle(activeNote.title);
      setBody(activeNote.body);
      setNoteId(activeNote.id);

      //Update selectedTags from active note as well. Remember Note and activeNote have tagIds instead of tags. So need to convert them
      setSelectedTags(
        activeNote.tagIds.map((tagId) => tags.find((tag) => tag.id == tagId))
      );
    }
  }, [activeNote, tags]);

  //tag = {label:'...' , id: '...'}
  //react-select tag: {label:'...' , value: '...' }

  //Save an already existing Note. Also update the activeNote everytime
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`savenote called`);
    const savedNote = {
      id: noteId,
      title,
      body,
      tagIds: selectedTags.map((tag) => tag.id),
    };
    dispatch({
      type: actions.SAVE_NOTE,
      payload: savedNote,
    });

    // Update activeState with same note
    dispatch({
      type: actions.SET_ACTIVE_NOTE,
      payload: savedNote,
    });
  };

  //=========================SAVING ITEMS TO LOCAL STORAGE=========================

  //Update localStorage when notes change
  useEffect(() => {
    localStorage.setItem('NOTES', JSON.stringify(notes));
  }, [notes]);

  //When tags update, we want to save them to localStorage as well.
  useEffect(() => {
    localStorage.setItem('TAGS', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    // localStorage.setItem('CONFIG', JSON.stringify({ activeNote }));
    localStorage.setItem('CONFIG', JSON.stringify({ activeNote })); //New addition
  }, [activeNote, title, body]);

  // =============================RETURN========================================
  return (
    <div className='noteContainer'>
      <div className='noteOptions'>
        <div className='tags'>
          <SelectTags
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
        <button
          className='noteButtons'
          type='submit'
          title='Ctrl+Alt+B'
          // ref={saveNote}
          onClick={handleSubmit}
        >
          Save
        </button>
        {/* <button className='noteButtons' onClick={handleSubmit}>
          View
        </button> */}
      </div>
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
              onChange={(e) => setTitle(e.target.value)}
              //Pressing enter would work like tab
              onFocus={(e) => pressEntertoFocusOn(e, bodyRef.current)}
            />
          </div>
          {/* <div className='noteBodyContainer'> */}
          <textarea
            name='noteBody'
            id='noteBody'
            placeholder='Write your note here...'
            ref={bodyRef}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            // cols='15'
            // rows='1'
          ></textarea>
          {/* </div> */}
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
