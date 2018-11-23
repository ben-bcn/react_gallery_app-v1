import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  return(
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/sunset'>Sunset</NavLink></li>
        <li><NavLink to='/dogs'>Dogs</NavLink></li>
        <li><NavLink to='/muppets'>Muppets</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
