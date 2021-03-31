import { BaseProps, Classing, Functional } from '../../../util';
import classes from './Card.module.css';

export interface CardProps extends BaseProps, Partial<Classing> {}

export const Card: Functional<CardProps> = props => (
  <div className={[classes.Card, props.className].join(' ')} style={props.style}>
    {props.children}
  </div>
);

export default Card;
