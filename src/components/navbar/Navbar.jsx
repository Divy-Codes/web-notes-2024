import './navbar.scss';

export default function Navbar() {
  return (
    <div className='navBarContainer'>
      <div className='leftGroup'>
        <button>Button A</button>
        <button>Button b</button>
        <button>Button c</button>
      </div>
      <div className='rightGroup'>
        <button>Save</button>
        <button>Button E</button>
        <button>Button F</button>
      </div>
    </div>
  );
}
