import './app.scss';
import FilesSidebar from './components/filesMenu/FilesSidebar.jsx';
import Note from './components/note/Note.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import ViewNote from './components/viewNote/ViewNote.jsx';
import { useEffect, useReducer, useState } from 'react';
import { useNotes } from './components/contextProvider/NotesProvider.jsx';

function App() {
  const [
    {
      config: { mode, activeNote },
    },
  ] = useNotes();

  //Toggle sidebar between files and search screen
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

  // function Layout({ children }) {
  //   const [sidebarScreen, setSidebarScreen] = useState('files');
  //   const changeSidebar = (value) => {
  //     setSidebarScreen(value);
  //   };

  //   return (
  //     <div className='container'>
  //       <nav className='navBar'>
  //         <Navbar changeSidebar={changeSidebar} />
  //       </nav>
  //       <div className='notesContainer'>
  //         <div className='sidebarContainer'>
  //           <FilesSidebar sidebarScreen={sidebarScreen} />
  //         </div>
  //         <div className='mainContainer'>{children}</div>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <Routes>
  //     <Route
  //       path='/'
  //       element={
  //         <Layout>
  //           <Note note={config.lastOpened} />
  //         </Layout>
  //       }
  //     />
  //     <Route path='/note/:id'></Route>
  //     <Route path='*' element={<Navigate to='/' />} />
  //   </Routes>
  // );
}

export default App;

{
  /*

=================================NOTES=================================================
1.) 
- If we store tags:{label,id} within a note and if the user ever changes the label of a tag then we will have to go to every single note and change the tag name/label there.
- Solution is to store tagIds in notes instead of tags. If user changes the label we only change the label and ids remain intact. Now we render the same tags ids with a few changed tag labels. We will have to match the tagsids with their labels.

2.) 

*/
}

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

//Note:{title,body,tags}
//RawNote:{title,body,tagIds}

//VERY IMPORTANT

//IMPORTANT: With ids and separate storage, we can make changes to separate things without messing with everything it is used in. Cause we used ids there
//When the user changes a tag label,we go to tags:[] and update the label there. When rendering we take the label from this tags array

{
  /*
  Data stored:
  NOTES:[{title,body,tagId},{}...]
  TAGS:[{tagId,label},{}...]
  config:{},
*/
}
