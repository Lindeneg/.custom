import { CSSProperties, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './Links';
import SideDrawer from './SideDrawer';
import Header from '../Header';
import Backdrop from '../../Interface/Backdrop';
import { BaseProps, Classing, Functional } from '../../../util';
import classes from './Navigation.module.css';

export interface NavigationProps extends BaseProps, Partial<Classing> {
  navLinks?: any[];
  headerStyle?: CSSProperties;
  headerCls?: string;
  homeLogoAlt?: string;
  homeLogoSrc?: string;
  homeLogoContent?: string;
  homeLogoWidth?: string | number;
  homeLogoHeight?: string | number;
}

export const Navigation: Functional<NavigationProps> = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const handleOnOpenDrawer = () => {
    setDrawerIsOpen(true);
  };

  const handleOnCloseDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={handleOnCloseDrawer} />}
      <SideDrawer show={drawerIsOpen} onClick={handleOnCloseDrawer}>
        <nav className={classes.Drawer}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <Header>
        <button className={classes.Btn} onClick={handleOnOpenDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes.Title}>
          <Link to="/">
            {props.homeLogoSrc ? (
              <img
                style={props.style}
                className={props.className}
                src={props.homeLogoSrc}
                alt={props.homeLogoAlt || 'Home'}
                width={props.homeLogoWidth}
                height={props.homeLogoHeight}
              ></img>
            ) : props.homeLogoContent ? (
              props.homeLogoContent
            ) : (
              'Home'
            )}
          </Link>
        </h1>
        <nav className={classes.Nav}>
          <NavLinks />
        </nav>
      </Header>
    </Fragment>
  );
};

export default Navigation;
