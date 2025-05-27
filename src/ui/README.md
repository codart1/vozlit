# UI Component Documentation

This document describes the reusable UI components available in this project.

## Button Component

The `Button` component provides a consistent button style throughout the application.

```tsx
import { Button } from '../ui';

<Button
  variant="primary" // 'primary' | 'secondary' | 'danger' | 'success' | 'cancel'
  size="md" // 'sm' | 'md' | 'lg'
  fullWidth={false} // boolean
  onClick={(e) => handleClick(e)} // MouseEvent handler
  class="optional-extra-class" // optional additional CSS class
>
  Button Text
</Button>
```

## Modal Component

The `Modal` component provides a consistent way to show modal dialogs in the application.

```tsx
import { Modal } from '../ui';

<Modal
  isOpen={showModal()} // boolean signal controlling visibility
  onClose={() => setShowModal(false)} // function called when modal is dismissed
  title="Modal Title" // optional title for the modal
  size="md" // 'sm' | 'md' | 'lg'
  position="center" // 'center' | 'top'
  class="optional-extra-class" // optional additional CSS class
  footer={<div>Optional Footer Content</div>} // optional footer content
>
  Modal Content
</Modal>
```

## ActionButtons Component

The `ActionButtons` component provides a standardized layout for action buttons (typically Cancel/Confirm).

```tsx
import { ActionButtons } from '../ui';

<ActionButtons
  onCancel={() => handleCancel()} // Cancel handler
  onConfirm={() => handleConfirm()} // Confirm handler
  cancelText="Cancel" // optional, defaults to "Cancel"
  confirmText="Save" // optional, defaults to "Confirm"
  cancelVariant="cancel" // 'cancel' | 'secondary' | 'danger'
  confirmVariant="primary" // 'primary' | 'success'
  size="sm" // 'sm' | 'md' | 'lg'
  class="optional-extra-class" // optional additional CSS class
/>
```

## ActionModal Component

The `ActionModal` component combines the Modal and ActionButtons components for a common use case.

```tsx
import { ActionModal } from '../ui';

<ActionModal
  isOpen={showModal()} // boolean signal controlling visibility
  onCancel={() => setShowModal(false)} // function called when Cancel is clicked
  onConfirm={() => handleConfirm()} // function called when Confirm is clicked
  title="Modal Title" // optional title for the modal
  size="md" // 'sm' | 'md' | 'lg'
  position="center" // 'center' | 'top'
  cancelText="Cancel" // optional, defaults to "Cancel"
  confirmText="Save" // optional, defaults to "Confirm"
  cancelVariant="cancel" // 'cancel' | 'secondary' | 'danger'
  confirmVariant="primary" // 'primary' | 'success'
  buttonSize="sm" // 'sm' | 'md' | 'lg'
  class="optional-extra-class" // optional additional CSS class
>
  Modal Content
</ActionModal>
```
