import './navbar.scss';
import { IoIosSearch } from 'react-icons/io';
import { FaFolderOpen } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar({ changeSidebar = (f) => f }) {
  return (
    <div className='navBarContainer'>
      <div className='leftOptions'>
        <button onClick={() => changeSidebar('files')}>
          <FaFolderOpen size={20} />
        </button>
        <button onClick={() => changeSidebar('search')}>
          <IoIosSearch size={20} />
        </button>
        <button>Button c</button>
      </div>
      <div className='rightOptions'>
        <button>Save All</button>
        <button>Button E</button>
        <button>Button F</button>
      </div>
    </div>
  );
}
