import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * @file A component for displaying short, informational labels.
 *
 * Badges are used to highlight an item's status for quick recognition.
 * They can be used for things like categories, tags, or statuses.
 * The component comes with several visual variants.
 *
 * @example
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Destructive</Badge>
 * <Badge variant="outline">Outline</Badge>
 */

/**
 * A set of styles for the badge component, managed by `class-variance-authority`.
 * This allows for different visual variants of the badge.
 *
 * Variants:
 * - `default`: The primary style.
 * - `secondary`: An alternative style.
 * - `destructive`: A style for conveying a negative or destructive action.
 * - `outline`: A style with a border and transparent background.
 */
const badgeVariants = cva(
  // Base styles
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * The props for the Badge component.
 * Extends standard HTML attributes for a `div` element and includes `variant` props from cva.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Renders a badge with the specified variant and content.
 *
 * @param {BadgeProps} props - The props for the component.
 * @param {string} [props.className] - Optional class name for custom styling.
 * @param {string} [props.variant] - The visual style of the badge.
 * @returns {JSX.Element} The rendered badge component.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
