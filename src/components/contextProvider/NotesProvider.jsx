import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

{
  /*
  note:{id,title,body}, 
  config:{
    activeNote:{id,title,body},
    mode:'view' or 'edit'
  }

  notes:[Array of note],
*/
}

const getLocalStored = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const dummyNote = {
  id: uuidv4(),
  title: 'Untitled',
  body: '',
};

const initialState = {
  notes: getLocalStored('NOTES') || [dummyNote],
  mode: 'edit',
  config: getLocalStored('CONFIG') || {
    activeNote: dummyNote,
  },
};

export const actions = {
  SAVE_NOTE: 'saveNote',
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

    case 'setActiveNote':
      return {
        ...state,
        config: {
          ...state.config,
          activeNote: payload,
        },
      };

    case 'toggleMode':
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
