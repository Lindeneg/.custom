import { Functional } from '../../../util';
import classes from './Header.module.css';

const Header: Functional = props => {
  return (
    <header style={props.style} className={classes.Header}>
      {props.children}
    </header>
  );
};

export default Header;
