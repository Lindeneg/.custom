import Modal from '../';
import Button from '../../../Interactable/Button';
import { Functional, BaseProps, Visibility, Closeable } from '../../../../util';

export interface ErrorModalProps extends BaseProps, Visibility, Closeable {
  error: string;
  headerText?: string;
  confirmText?: string;
}

export const ErrorModal: Functional<ErrorModalProps> = props => {
  return (
    <Modal
      onClose={props.onClose}
      headerText={props.headerText || 'An Error Occurred!'}
      show={props.show}
      footerNodes={
        <Button onClick={props.onClose}>{props.confirmText || 'Okay'}</Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
