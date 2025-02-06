import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const typographyVariants = cva('text-gray-900', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-medium',
      body1: 'text-base',
      body2: 'text-sm',
      caption: 'text-xs',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'body1',
    align: 'left',
    weight: 'normal',
    color: 'primary',
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = ({
  children,
  variant,
  align,
  weight,
  className,
  color,
  as: Component = 'p',
  ...props
}: TypographyProps) => {
  return (
    <Component
      className={cn(
        typographyVariants({ variant, align, weight, color }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
