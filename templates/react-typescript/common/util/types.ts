import React from 'react';

/**********************
 ****** UTILITY  ******
 **********************/

export enum HTMLHook {
  Backdrop = 'backdrop-hook',
  Modal = 'modal-hook',
  Drawer = 'drawer-hook'
}

export type OnSubmitFunc<T = HTMLFormElement> = React.FormEventHandler<T>;

export type OnClickFunc<T = HTMLElement, O = any> = (
  event?: React.MouseEvent<T, MouseEvent>,
  opt?: O
) => void;

export type OnChange<T = HTMLElement> = React.ChangeEventHandler<T>;

export type OnBlur<T = HTMLElement> = React.FocusEventHandler<T>;

export interface SIndexable<T> {
  [key: string]: T;
}

export interface NIndexable<T> {
  [key: number]: T;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type UseHttpRequest<T> = (
  url: string,
  method?: HttpMethod,
  body?: BodyInit | null,
  headers?: HeadersInit
) => Promise<T | void>;

export type UseHttp<T> = {
  isLoading: boolean;
  error: string;
  sendRequest: UseHttpRequest<T>;
  clearError: () => void;
};

export type ValidationReducer<S = {}, A = ValidationAction<AnyValidationAction>> = (
  state: S,
  action: A
) => S;

export type ValidationDispatch<A, P = {}> = React.Dispatch<ValidationAction<A, P>>;

export type UseValidationTuple<S = {}, A = AnyValidationAction, P = {}> = [
  S,
  ValidationDispatch<A, P>
];

export type Functional<P = BaseProps, R = JSX.Element> = (props: P) => R | null;

export type Portal<P = BaseProps> = Functional<P, React.ReactPortal>;

/**********************
 ****** PROPS  ********
 **********************/

export interface Identifiable {
  id: string;
}

export interface BaseProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface Classing {
  className: string;
}

export interface Visibility {
  show: boolean;
}

export interface Clickable<T = HTMLElement, O = any> {
  onClick: OnClickFunc<T, O>;
}

export interface Closeable<T = HTMLElement> {
  onClose: OnClickFunc<T>;
}

export interface Submittable<T = HTMLFormElement> {
  onSubmit: OnSubmitFunc<T>;
}

/**********************
 ***** VALIDATION  ****
 **********************/

export interface ValidationAction<T, P = {}> {
  type: T;
  payload: P;
  validators?: Validator[];
}

export interface AnyValidationAction extends ValidationAction<'any-action'> {}

export enum ValidationType {
  Require,
  MinLength,
  MaxLength,
  MinValue,
  MaxValue,
  MinUppercaseCharacters,
  MinNumericalSymbols,
  IsEqual
}

export type ValidationValue = number | string | boolean | undefined;

export type ActualValidationValue = number | string | boolean;

export interface Validator {
  type: ValidationType;
  value?: ValidationValue;
}

export type ValidationFunc = (
  value: ActualValidationValue,
  isValid: boolean,
  validator: Validator
) => boolean;
