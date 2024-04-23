import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [title, setTitle] = useState(activeNote?.title || 'Untitled');
  const [body, setBody] = useState(activeNote?.body || '');
  // const [selectedTags, setSelectedTags] = useState([]);
  const [noteId, setNoteId] = useState(activeNote?.id || null);
  const titleRef = useRef();
  const bodyRef = useRef();

  //Focus on title on every new activeNote by default.
  useEffect(() => {
    titleRef.current.focus();
  }, [activeNote]);

  //Update the contents to be rendered when activeNote changes.
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setBody(activeNote.body);
      setNoteId(activeNote.id);
      //Note and activeNote have tagIds instead of tags. So map out tags from selected tagIds of the note
      // setSelectedTags(
      //   activeNote.tagIds.map((tagId) => tags.find((tag) => tag.id == tagId))
      // );
    }
  }, [activeNote, tags]);

  //tag = {label:'...' , id: '...'}
  //react-select tag: {label:'...' , value: '...' }
  // const debouncedSaveNote = debounce(saveNote, 1000);

  const saveNote = useCallback(() => {
    if (title.trim().length > 0) {
      const savedNote = {
        id: noteId,
        title,
        body,
        // tagIds: selectedTags.map((tag) => tag.id),
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
    // }, [body, dispatch, noteId, selectedTags, title]);
  }, [body, dispatch, noteId, title]);

  //Save title
  const saveTitle = (e) => {
    setTitle(e.target.value);
    // saveNote();
  };

  //Save Body
  const saveBody = (e) => {
    setBody(e.target.value);
    // saveNote();
  };

  //Auto Save with debouncing
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      saveNote();
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, [title, body]);

  // useEffect(() => {
  //   console.log(`selected tags changed`);

  //   const savedNote = {
  //     id: noteId,
  //     title,
  //     body,
  //     tagIds: selectedTags.map((tag) => tag.id),
  //   };

  //   dispatch({
  //     type: actions.SAVE_SELECTED_TAGS,
  //     payload: savedNote,
  //   });
  // }, [dispatch, selectedTags]);

  // function saveNote() {
  //   //If title is not empty space(s)
  //   if (title.trim().length > 0) {
  //     const savedNote = {
  //       id: noteId,
  //       title,
  //       body,
  //       tagIds: selectedTags.map((tag) => tag.id),
  //     };

  //     dispatch({
  //       type: actions.SAVE_NOTE,
  //       payload: savedNote,
  //     });

  //     dispatch({
  //       type: actions.SET_ACTIVE_NOTE,
  //       payload: savedNote,
  //     });
  //   }
  // }

  //Save an already existing Note. Also update the activeNote everytime
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`savenote called`);
  //   const savedNote = {
  //     id: noteId,
  //     title,
  //     body,
  //     tagIds: selectedTags.map((tag) => tag.id),
  //   };
  //   dispatch({
  //     type: actions.SAVE_NOTE,
  //     payload: savedNote,
  //   });

  //   // Update activeState with same note
  //   dispatch({
  //     type: actions.SET_ACTIVE_NOTE,
  //     payload: savedNote,
  //   });
  // };

  //=========================SAVING ITEMS TO LOCAL STORAGE=========================

  //Update localStorage when notes change
  useEffect(() => {
    localStorage.setItem('NOTES', JSON.stringify(notes));
  }, [notes]);

  //When tags update, we want to save them to localStorage as well.
  // useEffect(() => {
  //   localStorage.setItem('TAGS', JSON.stringify(tags));
  // }, [tags]);

  useEffect(() => {
    // localStorage.setItem('CONFIG', JSON.stringify({ activeNote }));
    localStorage.setItem('CONFIG', JSON.stringify({ activeNote })); //New addition
  }, [activeNote, title, body]);

  // =============================RETURN========================================
  return (
    <div className='noteContainer'>
      <div className='noteOptions'>
        <div className='tags'>
          {/* <SelectTags
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          /> */}
        </div>
        {/* <button
          className='noteButtons'
          // type='submit'
          title='Ctrl+Alt+B'
          // ref={saveNote}
          // onClick={handleSubmit}
        >
          Save
        </button> */}
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
              onChange={saveTitle}
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
            onChange={saveBody}
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
