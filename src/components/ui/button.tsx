import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/utils/buttons-variants';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn('uppercase', buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <Loader2
            className={cn(
              'text-zinc-900 animate-spin text-xl absolute',
              loading ? 'visible' : 'invisible',
            )}
          />
        )}
        <span
          className={cn(!loading ? 'visible' : 'invisible', 'flex items-center')}
        >
          {children}
        </span>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button };
