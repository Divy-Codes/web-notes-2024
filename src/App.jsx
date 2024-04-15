import { Navigate, Route, Routes } from 'react-router-dom';
import './app.scss';
import FilesSidebar from './components/filesMenu/FilesSidebar.jsx';
import Note from './components/note/Note.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { useEffect } from 'react';
import useLocalStorage from './components/hooks/useLocalStorage.jsx';

function Layout({ children }) {
  const [notes, setNotes] = useLocalStorage('NOTES', []);
  const [tags, setTags] = useLocalStorage('TAGS', []);
  return (
    <div className='container'>
      <nav className='navBar'>
        <Navbar />
      </nav>
      <div className='notesContainer'>
        <div className='sidebarContainer'>
          <div className='oneMoreContainer'>
            <FilesSidebar />
          </div>
        </div>
        <div className='mainContainer'>{children}</div>
      </div>
      {/* <div className='sidebarContainer'>Headings</div> */}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <Note />
          </Layout>
        }
      />
      <Route path='/note/:id'></Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;

//Layout
//Left: File Structure
//Middle: Children. Whatever is passed gets rendered
//Right : Headings. Design and hide

//3 screens : NOTE LIST, New NOTE, Edit
//All Notes/Notes List
//Clicking on a note would open this Edit note to edit already created/ viewed note. This would also be the new Note form.
//HTML View Note to see the note in Rendered HTML using react-markdown.

//Opens previous note:-
//Config file that stores the following
//Prev Note:
//Can also store the scroll position

//Full mode/Website view mode will hide menu bar.
//or add menu bar viewing and hiding capabilities in settings.

//Clicking on a heading would scroll to it.
//Just view the JSX rendered by react-markdown. You can manipulate h1,h2,h3,h4,h5,h6. You can also give them all an id attribute which can merely be an index. And you can scroll to it.
//In order to view it all as one section, you can add the content into a div and give a certain section id to it. Try your best.

//Tabs functionality as well
