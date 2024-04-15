import { useEffect, useRef, useState } from 'react';
import './note.scss';
import CreateableReactSelect from 'react-select/creatable';
import { debounce, pressEntertoFocusOn } from '../../utils/helperMethods';
export default function Note() {
  const titleRef = useRef();
  const bodyRef = useRef();
  //Our Single tag = {label:... , id: ....}
  //react-select expects a tag to be {label:... , value: ... }
  const [selectedTags, setSelectedTags] = useState([]);
  const saveNote = useRef();

  const onSubmit = (f) => f;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`handleSubmit called`);
    onSubmit({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      tags: [],
    });
  };

  //Save the note by pressing Ctrl + ALt + v
  useEffect(() => {
    const saveForm = (e) => {
      if (e.ctrlKey && e.altKey && e.key == 'b') {
        e.stopPropagation();
        // saveNote.current.dispatchEvent(new CustomEvent('click'));

        console.log(`form saved`);
      }
    };

    const debouncedSaveForm = debounce(saveForm);

    window.addEventListener('keydown', debouncedSaveForm);
    return () => window.removeEventListener('keydown', debouncedSaveForm);
  }, []);

  return (
    <div className='noteContainer'>
      <div className='noteOptions'>
        <div className='tags'>
          <CreateableReactSelect
            isMulti
            value={selectedTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            onChange={(tags) =>
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              )
            }
          />
        </div>
        <button
          className='saveNote'
          type='submit'
          title='Ctrl+Alt+B'
          ref={saveNote}
          onClick={handleSubmit}
        >
          Save
        </button>
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
            // cols='15'
            // rows='1'
          ></textarea>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}
