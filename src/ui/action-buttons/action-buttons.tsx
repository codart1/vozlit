import { JSX } from 'solid-js';
import { Button } from '../button';
import styles from './action-buttons.module.scss';

export interface ActionButtonsProps {
  onCancel: (e?: MouseEvent) => void;
  onConfirm: (e?: MouseEvent) => void;
  cancelText?: string;
  confirmText?: string;
  cancelVariant?: 'cancel' | 'secondary' | 'danger';
  confirmVariant?: 'primary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

export function ActionButtons(props: ActionButtonsProps) {
  const cancelText = props.cancelText || 'Cancel';
  const confirmText = props.confirmText || 'Confirm';
  const cancelVariant = props.cancelVariant || 'cancel';
  const confirmVariant = props.confirmVariant || 'primary';
  const size = props.size || 'sm';
  
  return (
    <div class={`${styles.actionButtons} ${props.class || ''}`}>
      <Button 
        variant={cancelVariant} 
        size={size} 
        onClick={props.onCancel}
        class={styles.actionButton}
      >
        {cancelText}
      </Button>
      <Button
        variant={confirmVariant}
        size={size}
        onClick={props.onConfirm}
        class={styles.actionButton}
      >
        {confirmText}
      </Button>
    </div>
  );
}
