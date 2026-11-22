'use client';
import {forwardRef, type ButtonHTMLAttributes} from 'react';
import {Slot} from '@radix-ui/react-slot';
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {asChild?: boolean};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({asChild, className = '', type = 'button', ...props}, ref) {
  const Component = asChild ? Slot : 'button';
  return <Component ref={ref} type={asChild ? undefined : type} data-ui-component="button" className={`min-h-control cursor-pointer font-inherit focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-focus ${className}`} {...props}/>;
});
