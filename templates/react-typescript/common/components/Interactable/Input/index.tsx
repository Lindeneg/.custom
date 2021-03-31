import { useReducer, useEffect, CSSProperties } from 'react';

import inputReducer from './reducer';
import InputAction from './actions';
import {
  BaseProps,
  Functional,
  Identifiable,
  OnBlur,
  OnChange,
  Classing,
  UseValidationTuple,
  ValidationValue,
  Validator,
  Clickable
} from '../../../util';
import classes from './Input.module.css';

export interface SelectOptions extends Partial<Classing> {
  value: string;
  content?: string;
  style?: CSSProperties;
}

export interface InputProps
  extends BaseProps,
    Partial<Classing>,
    Partial<Identifiable>,
    Partial<Clickable> {
  onInput: (...args: any[]) => void;
  element: 'input' | 'text-area' | 'select';
  type?: 'text' | 'number' | 'email' | 'password';
  resize?: 'vertical' | 'horizontal' | 'none';
  value?: ValidationValue;
  label?: string;
  errorText?: string;
  placeHolder?: string;
  rows?: number;
  valid?: boolean;
  validators?: Validator[];
  selectOptions?: SelectOptions[];
}

export interface InputState {
  value: ValidationValue;
  isValid: boolean;
  isTouched: boolean;
}

export type InputPayload = Partial<InputState>;

export const Input: Functional<InputProps> = props => {
  const [state, dispatch]: UseValidationTuple<
    InputState,
    InputAction,
    InputPayload
  > = useReducer(inputReducer, {
    value: props.value || '',
    isValid: props.valid || false,
    isTouched: false
  });

  const onChangeHandler: OnChange<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = event => {
    dispatch({
      type: InputAction.CHANGE,
      payload: {
        value: event.target.value
      },
      validators: props.validators
    });
  };

  const onTouchHandler: OnBlur<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = event => {
    dispatch({ type: InputAction.TOUCH, payload: {} });
  };

  const { id, onInput } = props;
  const { value, isValid } = state;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  let element: JSX.Element;
  switch (props.element) {
    case 'input':
      element = (
        <input
          id={props.id}
          type={props.type || 'text'}
          placeholder={props.placeHolder}
          onChange={onChangeHandler}
          onBlur={onTouchHandler}
          value={state.value?.toString()}
          className={props.className}
          style={props.style}
        />
      );
      break;
    case 'text-area':
      element = (
        <textarea
          id={props.id}
          placeholder={props.placeHolder}
          rows={props.rows || 3}
          onChange={onChangeHandler}
          onBlur={onTouchHandler}
          style={{ ...props.style, resize: props.resize }}
          className={props.className}
          value={state.value?.toString()}
        />
      );
      break;
    case 'select':
      element = (
        <select
          style={props.style}
          onChange={onChangeHandler}
          id={props.id}
          value={state.value?.toString()}
          onClick={props.onClick}
          className={classes.Selector}
        >
          {(props.selectOptions ? props.selectOptions : []).map((option, index) => (
            <option
              key={index}
              style={option.style}
              value={option.value}
              className={[
                classes.Option,
                option.className ? option.className : ''
              ].join(' ')}
            >
              {option.content || option.value}
            </option>
          ))}
        </select>
      );
      break;
    default:
      element = <input />;
      break;
  }

  return (
    <div
      className={[
        classes.Control,
        !state.isValid && state.isTouched ? classes.Invalid : null,
        state.isValid && state.isTouched ? classes.Valid : null
      ].join(' ')}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!state.isValid && state.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
