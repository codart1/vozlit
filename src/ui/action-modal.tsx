import { ActionButtons, ActionButtonsProps } from './action-buttons';
import { Modal, ModalProps } from './modal';

export interface ActionModalProps extends Omit<ModalProps, 'footer'> {
  onCancel: (e?: MouseEvent) => void;
  onConfirm: (e?: MouseEvent) => void;
  cancelText?: string;
  confirmText?: string;
  cancelVariant?: 'cancel' | 'secondary' | 'danger';
  confirmVariant?: 'primary' | 'success';
  buttonSize?: 'sm' | 'md' | 'lg';
}

export function ActionModal(props: ActionModalProps) {
  const {
    onCancel,
    onConfirm,
    cancelText,
    confirmText,
    cancelVariant,
    confirmVariant,
    buttonSize,
    ...modalProps
  } = props;

  const actionButtonProps: ActionButtonsProps = {
    onCancel,
    onConfirm,
    cancelText,
    confirmText,
    cancelVariant,
    confirmVariant,
    size: buttonSize || 'sm',
  };

  return (
    <Modal
      {...modalProps}
      onClose={onCancel}
      footer={<ActionButtons {...actionButtonProps} />}
    />
  );
}
