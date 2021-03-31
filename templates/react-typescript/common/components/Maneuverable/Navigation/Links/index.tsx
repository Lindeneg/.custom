import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Functional } from '../../../../util';
import classes from './Links.module.css';

const NavLinks: Functional = props => {
  return (
    <ul className={classes.Link}>
      <Fragment>
        <li>
          <NavLink activeClassName={classes.Active} to="/" exact>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.Active} to="/boards" exact>
            SOMETHING
          </NavLink>
        </li>
      </Fragment>
    </ul>
  );
};

export default NavLinks;
