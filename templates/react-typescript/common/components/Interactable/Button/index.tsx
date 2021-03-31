import { Link } from 'react-router-dom';

import { BaseProps, Functional, Clickable } from '../../../util';
import classes from './Button.module.css';

export interface ButtonProps extends BaseProps, Partial<Clickable> {
  anchor?: { href: string };
  link?: { to: string };
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'big';
  disabled?: boolean;
  inverse?: boolean;
  danger?: boolean;
}

export const Button: Functional<ButtonProps> = props => {
  const cls: string = [
    classes.Default,
    props.size === 'big' ? classes.Big : props.size === 'small' ? classes.Small : '',
    props.inverse && classes.Inverse,
    props.danger && classes.Danger
  ].join(' ');
  if (props.anchor) {
    return (
      <a href={props.anchor.href} className={cls} style={props.style}>
        {props.children}
      </a>
    );
  } else if (props.link) {
    return (
      <Link to={props.link.to} className={cls} style={props.style}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <button
        type={props.type || 'button'}
        onClick={props.onClick}
        disabled={props.disabled}
        className={cls}
        style={props.style}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
