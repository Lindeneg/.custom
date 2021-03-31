import InputAction from './actions';
import { InputState, InputPayload } from '.';
import { validate, ValidationAction, ValidationReducer } from '../../../util';

const reducer: ValidationReducer<
  InputState,
  ValidationAction<InputAction, InputPayload>
> = (state, action) => {
  switch (action.type) {
    case InputAction.CHANGE:
      return {
        ...state,
        value: action.payload.value,
        isValid: validate(action.payload.value || '', action.validators || [])
      };
    case InputAction.TOUCH:
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

export default reducer;
