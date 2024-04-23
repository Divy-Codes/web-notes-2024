import './searchFiles.scss';
import { useEffect, useState } from 'react';
import AllFiles from '../allFiles/AllFiles';
import { searchWithTitle } from '../../utils/helperMethods';
import { useNotes } from '../contextProvider/NotesProvider';

export default function SearchFiles() {
  const [{ notes }] = useNotes();
  const [searchedString, setSearchedString] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  //Debounced call for search
  useEffect(() => {
    if (searchedString == '') return;
    const timeoutId = setTimeout(() => {
      setFilteredNotes(searchWithTitle(notes, searchedString));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [notes, searchedString]);

  useEffect(() => {
    console.log(`filteredNotes:`, filteredNotes);
  }, [filteredNotes]);

  const searchNotes = (e) => {
    e.preventDefault();
    searchWithTitle(notes, searchedString);
  };

  return (
    <div className='searchContainer'>
      <form className='searchForm' onSubmit={searchNotes}>
        <div className='searchTitleContainer'>
          <input
            type='text'
            name='searchNote'
            id='searchNote'
            value={searchedString}
            onChange={(e) => setSearchedString(e.target.value)}
            placeholder='Search titles ...'
            className='searchNote'
          />
        </div>
      </form>
      <ul>
        <AllFiles notes={filteredNotes} searchBar={true} />
      </ul>
    </div>
  );
}
