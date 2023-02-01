import React, { useState } from 'react';
import './header.css';
import Weather from './weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faWind, faPooStorm, faHouse, faX, faBars  } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <header>
        <button className='toggle' onClick={handleClick}>
          {toggle ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
        <ul className={toggle ? 'mobile-view' : 'nav'}>
          <li><FontAwesomeIcon icon={faHouse} /></li>
          <li className='item1'><FontAwesomeIcon icon={faCloud} /></li>
          <li className='item1'><FontAwesomeIcon icon={faWind} /></li>
          <li className='item1'><FontAwesomeIcon icon={faPooStorm} /></li>
        </ul>
      </header>
    </div>
  );
}



export default Header