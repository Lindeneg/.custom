import ReactDOM from 'react-dom';

import { BaseProps, Clickable, Portal, HTMLHook } from '../../../util';
import classes from './Backdrop.module.css';

export interface BackdropProps extends BaseProps, Clickable {}

export const Backdrop: Portal<BackdropProps> = props => {
  const target: HTMLElement | null = document.getElementById(HTMLHook.Backdrop);
  if (target !== null) {
    return ReactDOM.createPortal(
      <div className={classes.Backdrop} onClick={props.onClick}></div>,
      target
    );
  }
  return null;
};

export default Backdrop;
