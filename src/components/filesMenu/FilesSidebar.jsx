import { useNotes } from '../contextProvider/NotesProvider';
import './fileSidebar.scss';

import AllFiles from '../allFiles/AllFiles';
import SearchFiles from '../searchFiles/SearchFiles';
export default function FilesSidebar({ sidebarScreen }) {
  const [{ notes }] = useNotes();
  return (
    <div className='menuContainer'>
      {sidebarScreen == 'files' ? (
        <AllFiles notes={notes} searchBar={false} />
      ) : (
        <SearchFiles />
      )}
    </div>
  );
}
