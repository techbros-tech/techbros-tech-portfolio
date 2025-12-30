# UI Components Documentation

## HighlightText Component

A reusable component that applies a 3D greenish glow effect to important text, matching the style of "TECHBROS" in the hero section.

### Usage

```tsx
import { HighlightText } from "@/components/ui/highlight-text";

// Basic usage
<HighlightText>Innovation</HighlightText>

// With animation on scroll
<HighlightText animate delay={0.2}>
  Problem Solvers
</HighlightText>

// With custom className
<HighlightText className="text-4xl font-bold">
  Excellence
</HighlightText>

// With custom style override
<HighlightText style={{ transform: "none" }}>
  Technology
</HighlightText>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | The text or content to highlight |
| `className` | `string` | `""` | Additional CSS classes to apply |
| `animate` | `boolean` | `false` | Whether to animate the text on scroll into view |
| `delay` | `number` | `0` | Animation delay in seconds (only used when `animate` is true) |
| `style` | `React.CSSProperties` | `{}` | Custom inline styles to override defaults |

### Styling Details

The component applies the following visual effects:

- **Color**: Emerald to green gradient (`from-emerald-600 to-green-700` in light mode, `from-emerald-500 to-green-600` in dark mode)
- **3D Effect**: Perspective transform with slight rotation
- **Glow**: Multiple layered text shadows creating a greenish glow
- **Filter**: Drop shadow and brightness adjustment for enhanced depth

### Examples in the Project

#### Hero Section
The subtitle and description in the hero section highlight key terms:
- "Where **Innovation** Meets **Reality**"
- "Building tomorrow's **digital solutions** today with cutting-edge **technology** and creative **excellence**"

#### Scroll Reveal Section
Important keywords are highlighted throughout the scrolling text:
- **TechBros**
- **innovators**
- **problem solvers**
- **reality**
- **creativity**
- **technology**
- **products**
- **solutions**
- **expertise**
- **future**

### Best Practices

1. **Use Sparingly**: Highlight only the most important keywords to maintain impact
2. **Consistent Application**: Use for similar types of content (company name, key values, action words)
3. **Consider Context**: The effect works best on darker or neutral backgrounds
4. **Accessibility**: Ensure sufficient color contrast even with the gradient effect
5. **Performance**: If using `animate` prop extensively, consider implementing intersection observer thresholds

### Technical Notes

- The component uses `framer-motion` for animations when `animate={true}`
- Default 3D transforms may not work well in all contexts - use the `style` prop to override when needed
- The component is fully responsive and works in both light and dark modes
- Text is transparent with background-clip for the gradient effect