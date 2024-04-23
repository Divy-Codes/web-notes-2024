import './app.scss';
import FilesSidebar from './components/filesMenu/FilesSidebar.jsx';
import Note from './components/note/Note.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import ViewNote from './components/viewNote/ViewNote.jsx';
import { useState } from 'react';
import { useNotes } from './components/contextProvider/NotesProvider.jsx';

function App() {
  const [{ mode }] = useNotes();
  const [sidebarScreen, setSidebarScreen] = useState('files');
  const changeSidebar = (value) => {
    setSidebarScreen(value);
  };

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
