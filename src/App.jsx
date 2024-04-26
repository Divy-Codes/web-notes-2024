import './app.scss';
import FilesSidebar from './components/filesMenu/FilesSidebar.jsx';
import Note from './components/note/Note.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import ViewNote from './components/viewNote/ViewNote.jsx';
import { useEffect, useState } from 'react';
import {
  actions,
  useNotes,
} from './components/contextProvider/NotesProvider.jsx';

function App() {
  const [{ mode }, dispatch] = useNotes();
  const [sidebarScreen, setSidebarScreen] = useState('files');
  const changeSidebar = (value) => {
    setSidebarScreen(value);
  };

  //Add event listener during startup. Toggle mode by pressing 'Ctrl' + ';'
  useEffect(() => {
    const toggleMode = (e) => {
      e.stopPropagation();
      if (e.ctrlKey && e.key == ';') {
        dispatch({ type: actions.TOGGLE_MODE });
      }
    };
    window.addEventListener('keydown', toggleMode);
    return () => window.removeEventListener('keydown', toggleMode);
  }, []);

  return (
    <div className='container'>
      <nav className='navBar'>
        <Navbar changeSidebar={changeSidebar} />
      </nav>
      <div className='notesContainer'>
        <div className='sidebarContainer'>
          <FilesSidebar sidebarScreen={sidebarScreen} />
        </div>
        <div className='mainContainer'>
          {mode == 'edit' ? <Note /> : <ViewNote />}
        </div>
      </div>
    </div>
  );
}

export default App;
