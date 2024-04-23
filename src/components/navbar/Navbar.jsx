import './navbar.scss';
import { IoIosSearch } from 'react-icons/io';
import { FaFolderOpen } from 'react-icons/fa';
import { MdEdit, MdRemoveRedEye } from 'react-icons/md';
import { actions, useNotes } from '../contextProvider/NotesProvider';

export default function Navbar({ changeSidebar = (f) => f }) {
  const [{ mode }, dispatch] = useNotes();

  return (
    <div className='navBarContainer'>
      <div className='leftOptions'>
        <button onClick={() => changeSidebar('files')}>
          <FaFolderOpen size={20} />
        </button>
        <button onClick={() => changeSidebar('search')}>
          <IoIosSearch size={20} />
        </button>
      </div>
      <div className='rightOptions'>
        <button
          className='viewEdit'
          title={mode == 'edit' ? 'view mode' : 'edit mode'}
          onClick={() => dispatch({ type: actions.TOGGLE_MODE })}
        >
          {mode != undefined && mode == 'view' ? (
            <MdEdit size={20} />
          ) : (
            <MdRemoveRedEye size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
