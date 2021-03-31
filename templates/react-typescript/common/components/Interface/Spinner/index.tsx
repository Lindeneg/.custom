import { Functional, BaseProps } from '../../../util';
import classes from './Spinner.module.css';

export interface SpinnerProps extends BaseProps {
  asOverlay?: boolean;
  center?: boolean;
}

export const Spinner: Functional<SpinnerProps> = props => (
  <div className={props.center ? classes.Center : ''}>
    <div className={`${props.asOverlay && classes.Overlay}`} style={props.style}>
      <div className={classes.Spinner}></div>
    </div>
  </div>
);

export default Spinner;
