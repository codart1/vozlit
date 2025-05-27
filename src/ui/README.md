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

## Tabs Component

The `Tabs` component provides a flexible and customizable tabbed interface for organizing content.

```tsx
import { Tabs, TabItem } from '../ui';

// Define the tabs data
const tabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'First Tab',
    icon: 'optional-icon-url.png', // Optional
    content: <div>Content for first tab</div>, // Optional if using renderTabContent
    disabled: false // Optional, defaults to false
  },
  {
    id: 'tab2',
    label: 'Second Tab',
    content: <div>Content for second tab</div>
  },
  // Add more tabs as needed
];

// Optional custom tab content renderer
const renderCustomTabContent = (tab: TabItem, index: number) => (
  <div>Custom content for {tab.label} (index: {index})</div>
);

<Tabs
  tabs={tabs} // Array of tab items
  defaultActiveIndex={0} // Optional, defaults to 0
  onTabChange={(index) => setActiveTab(index)} // Optional tab change handler
  renderTabContent={renderCustomTabContent} // Optional custom renderer
  showActiveIndicator={true} // Optional, show dot indicator on active tab icon
  maxLabelLength={20} // Optional, truncate labels longer than this
  variant="default" // 'default' | 'pills' | 'underline' | 'minimal'
  size="medium" // 'small' | 'medium' | 'large'
  orientation="horizontal" // 'horizontal' | 'vertical'
  fullWidth={false} // Optional, make tabs fill container width
  class="optional-container-class" // Optional container class
  tabsClass="optional-tabs-class" // Optional class for tabs bar
  contentClass="optional-content-class" // Optional class for content area
  contentHeight="400px" // Optional, custom height for the tab content area
/>
```

The `Tabs` component is highly customizable:

- **Variants**: Choose from different visual styles: default (underlined), pills, minimal
- **Sizes**: Select from small, medium, and large sizes
- **Orientations**: Support for both horizontal and vertical layouts
- **Full Width**: Option to make tabs fill the entire width of the container
- **Custom Content**: Flexible content rendering with fallbacks
- **Active Indicator**: Option to show a pulsing indicator on active tabs
- **Label Truncation**: Automatically handles long tab labels

For more examples, see `src/components/UI-Examples/TabsExample.tsx`.
