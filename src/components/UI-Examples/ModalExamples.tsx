import { createSignal } from 'solid-js';
import { Modal, ActionModal, Button, ActionButtons } from '../../ui';
import styles from './ModalExamples.module.scss';

export function ModalExamples() {
  const [showBasicModal, setShowBasicModal] = createSignal(false);
  const [showActionModal, setShowActionModal] = createSignal(false);
  const [showCustomModal, setShowCustomModal] = createSignal(false);
  
  return (
    <div class={styles.container}>
      <h2>Modal Components</h2>
      
      <div class={styles.examples}>
        <div class={styles.example}>
          <h3>Basic Modal</h3>
          <p>Simple modal with a title and content.</p>
          <Button onClick={() => setShowBasicModal(true)}>Show Basic Modal</Button>
        </div>
        
        <div class={styles.example}>
          <h3>Action Modal</h3>
          <p>A modal with confirm/cancel buttons for common tasks.</p>
          <Button onClick={() => setShowActionModal(true)}>Show Action Modal</Button>
        </div>
        
        <div class={styles.example}>
          <h3>Custom Modal</h3>
          <p>A modal with custom footer content.</p>
          <Button onClick={() => setShowCustomModal(true)}>Show Custom Modal</Button>
        </div>
      </div>
      
      {/* Basic Modal */}
      <Modal
        isOpen={showBasicModal()}
        onClose={() => setShowBasicModal(false)}
        title="Basic Modal"
        size="md"
      >
        <div class={styles.modalContent}>
          <p>This is a basic modal with a title and content.</p>
          <p>Click outside or press ESC to close.</p>
        </div>
      </Modal>
      
      {/* Action Modal */}
      <ActionModal
        isOpen={showActionModal()}
        onCancel={() => setShowActionModal(false)}
        onConfirm={() => {
          alert('Action confirmed!');
          setShowActionModal(false);
        }}
        title="Action Modal"
        size="md"
        cancelText="Cancel"
        confirmText="Confirm"
      >
        <div class={styles.modalContent}>
          <p>This modal has built-in action buttons.</p>
          <p>Click Confirm to trigger an action or Cancel to dismiss.</p>
        </div>
      </ActionModal>
      
      {/* Custom Modal */}
      <Modal
        isOpen={showCustomModal()}
        onClose={() => setShowCustomModal(false)}
        title="Custom Modal"
        size="md"
        footer={
          <div class={styles.customFooter}>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => alert('Custom action!')}
            >
              Custom Action
            </Button>
            <ActionButtons 
              onCancel={() => setShowCustomModal(false)}
              onConfirm={() => {
                alert('Custom confirm!');
                setShowCustomModal(false);
              }}
              confirmText="Save"
              size="sm"
            />
          </div>
        }
      >
        <div class={styles.modalContent}>
          <p>This modal has a custom footer with multiple actions.</p>
          <p>You can combine the Button and ActionButtons components.</p>
        </div>
      </Modal>
    </div>
  );
}
