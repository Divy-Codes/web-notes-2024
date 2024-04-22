import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

{
  /*
  note:{id,title,body,tagIds}, //Note only contains tagIds. Helps if tags are renamed.
  tag:{tagId,label},
  config:{
    activeNote:{id,title,body,tagIds},
    mode:'view' or 'edit'
  }

  notes:[Array of note],
  tags:Contains all created tags
*/
}

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
  mode: 'edit',
  config: getLocalStored('CONFIG') || {
    activeNote: dummyNote,
  },
};

export const actions = {
  SAVE_NOTE: 'saveNote',
  CHANGE_TAGS: 'changeTags',
  ADD_NEW_TAGS: 'addNewTag',
  SET_ACTIVE_NOTE: 'setActiveNote',
  ADD_NEW_NOTE: 'addNewNote',
  TOGGLE_MODE: 'toggleMode',
  DELETE_NOTE: 'deleteNote',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'addNewNote':
      return {
        ...state,
        notes: [...state.notes, payload],
      };

    case 'saveNote':
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
      return {
        ...state,
        config: {
          ...state.config,
          activeNote: payload,
        },
      };

    case 'toggleMode':
      console.log(`toggleMode called`);

      return {
        ...state,
        mode: state.mode == 'edit' ? 'view' : 'edit',
      };

    case 'deleteNote':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id != payload.id),
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
