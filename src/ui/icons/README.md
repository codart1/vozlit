# Icon Components

This folder contains reusable SVG icon components for the project.

## Guidelines

- All icons should be outlined style, not solid
- Icons should be implemented as SolidJS components
- Use the `IconProps` interface for consistent props
- SVG elements should include appropriate ARIA attributes for accessibility
- Default size should be 24x24 pixels unless specified otherwise

## Usage

```tsx
import { StarIcon } from '../ui/icons';

// Basic usage
<StarIcon />

// With custom size
<StarIcon size={16} />

// With custom color
<StarIcon color="var(--accent-color)" />

// With custom class
<StarIcon class="my-icon" />

// With conditional classes
<StarIcon classList={{ active: isActive }} />
```

## Adding New Icons

1. Create a new file for your icon component
2. Implement the SVG as an outlined-style icon
3. Export the component from the `index.ts` file
4. Follow the existing pattern for props and styling
