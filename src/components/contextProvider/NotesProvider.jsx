import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// function getSelectedTagIds(tags,selectedTags){
//   return selectedTags.map(selectedTag=>{
//     return tags.filter(tag=>tag.label==selectedTag.id?);
//   })
// }

const getLocalStored = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const dummyNote = {
  id: uuidv4(),
  title: 'Untitled',
  body: '',
  tagIds: [],
};

const initialState = {
  notes: getLocalStored('NOTES') || [dummyNote],
  tags: getLocalStored('TAGS') || [],
  config: getLocalStored('CONFIG') || {
    activeNote: dummyNote,
  },
};

{
  /*
  note:{id,title,body,tagIds}, //Note only contains tagIds. Helps if tags are renamed.
  tag:{tagId,label},
  config:{activeNote:{id,title,body,tagIds}}

  notes:[Array of note],
  tags:Contains all created tags
*/
}

export const actions = {
  SAVE_NOTE: 'saveNote',
  CHANGE_TAGS: 'changeTags',
  ADD_NEW_TAGS: 'addNewTag',
  SET_ACTIVE_NOTE: 'setActiveNote',
  ADD_NEW_NOTE: 'addNewNote',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'addNewNote':
      return {
        ...state,
        notes: [...state.notes, payload],
      };

    //We will check if it's an old note or new note using payload.id
    case 'saveNote':
      console.log(`saveNote called`);
      console.log(`payload:`, payload);

      // payload.id == null
      // ? {
      //     ...state,
      //     notes: [
      //       ...state.notes,
      //       {
      //         id: uuidv4(),
      //         title: payload.title,
      //         body: payload.body,
      //         //Only send the ids to the note stored in main state . Refer to notes in Note.jsx for reason
      //         tagIds: payload.selectedTags.map((tag) => tag.id),
      //       },
      //     ],
      //   }
      // : {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id == payload.id ? payload : note
        ),
      };

    case 'addNewTag':
      return {
        ...state,
        tags: [...state.tags, payload.newTag],
      };

    case 'setActiveNote':
      console.log(`payload :`, payload);

      return {
        ...state,
        config: {
          activeNote: payload,
        },
      };

    default:
      return;
  }
};

//Exporting custom useNotes hook. This will provide the notes state and all reducer methods to all children components
const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

export default function NotesProvider({ children }) {
  //   const [notes, dispatch] = useReducer(reducer, initialState);
  return (
    <NotesContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </NotesContext.Provider>
  );
}

//Whatever is returned by the reducer is in fact setState() into the intial state. This would also re-render all the components. Yes calling dispatch would cause re-renders as it is updating the state.
