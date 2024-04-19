import { useNotes } from '../contextProvider/NotesProvider';
import './fileSidebar.scss';

import AllFiles from '../allFiles/AllFiles';
import SearchFiles from '../searchFiles/SearchFiles';
export default function FilesSidebar({ sidebarScreen }) {
  const [{ notes, tags }, dispatch] = useNotes();
  console.log(`Notes at all files:`, notes);

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

// const [searchedString, setSearchedString] = useState();
// const [searchFor, setSearchFor] = useState('titles');
// const [allTitles, setAllTitles] = useState();
// const [searchedTags, setSearchedTags] = useState([]);
