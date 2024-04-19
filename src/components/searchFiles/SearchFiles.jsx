import './searchFiles.scss';
import { IoIosSearch } from 'react-icons/io';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import AllFiles from '../allFiles/AllFiles';
import {
  searchWithTags,
  searchWithTitle,
  debouncedSearchWithTitle,
  debouncedSearchWithTags,
} from '../../utils/helperMethods';

import { useNotes } from '../contextProvider/NotesProvider';

export default function SearchFiles() {
  const [{ notes, tags }, dispatch] = useNotes();
  const [searchedString, setSearchedString] = useState('');
  const [searchFor, setSearchFor] = useState('titles');
  const [allTitles, setAllTitles] = useState();
  const [searchedTags, setSearchedTags] = useState([]);
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
    if (searchedTags.length == 0) return;
    const timeoutId = setTimeout(() => {
      setFilteredNotes(searchWithTags(notes, searchedTags));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [notes, searchedTags]);

  useEffect(() => {
    console.log(`filteredNotes:`, filteredNotes);
  }, [filteredNotes]);

  const searchNotes = (e) => {
    e.preventDefault();
    searchFor == 'titles'
      ? searchWithTitle(notes, searchedString)
      : searchWithTags(notes, searchedTags);
  };

  return (
    <div className='searchContainer'>
      <form className='searchForm' onSubmit={searchNotes}>
        <div className='searchForContainer'>
          <select
            name='searchFor'
            id='searchFor'
            className='searchFor'
            value={searchFor}
            onChange={(e) => setSearchFor(e.target.value)}
          >
            <option value='titles'>Titles</option>
            <option value='tags'>Tags</option>
          </select>
        </div>
        {searchFor == 'titles' ? (
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
        ) : (
          <div className='selectTagsContainer'>
            <ReactSelect
              isMulti
              className='reactSelectContainer'
              //Options is total number of tags already created
              options={tags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              //Value is total tags selected for the specific note
              value={searchedTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              //onChange called when there is a change in tags of that note.
              onChange={(tags) =>
                setSearchedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                )
              }
              theme={(theme) => ({
                ...theme,
                borderRadius: '4px',
                colors: {
                  ...theme.colors,
                  primary25: '#555',
                  // primary: 'black',
                },
              })}
              styles={{
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: '#242424',
                  color: '#eee',
                }),

                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: '#242424',
                  color: '#fff',
                  width: '100%',
                  cursor: 'pointer',
                  border: 'none',
                  outline: state.isFocused ? 'none' : 'none',
                }),

                container: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'yellowgreen',
                  color: '#fff',
                  width: '100%',
                  cursor: 'pointer',
                  // border: '2px solid #555',
                  border: state.isFocused ? '2px solid #555' : '2px solid #555',
                  outline: state.isFocused ? 'none' : 'none',
                }),

                input: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: '#242424',
                  color: '#fff',
                  maxWidth: '80%',
                }),
              }}
            />
          </div>
        )}
      </form>
      <ul>
        {/* {filteredNotes &&
          filteredNotes.map((note) => <li key={note.id}>{note.title}</li>)} */}
        <AllFiles notes={filteredNotes} searchBar={true} />
      </ul>
    </div>
  );
}
