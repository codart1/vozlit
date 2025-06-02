import style from './button.module.scss';
import { JSX, mergeProps, splitProps } from 'solid-js';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'cancel' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: (e: MouseEvent) => void;
  class?: string;
}

export function Button(props: ButtonProps) {
  const merged = mergeProps({ variant: 'primary', size: 'md', fullWidth: false }, props);
  const [local, others] = splitProps(merged, ['children', 'variant', 'size', 'fullWidth', 'class']);
  
  const classes = () => {
    return [
      style.btn,
      style[`btn-${local.variant}`],
      style[`btn-${local.size}`],
      local.fullWidth ? style.fullWidth : '',
      local.class || ''
    ].filter(Boolean).join(' ');
  };

  return (
    <button 
      class={classes()} 
      {...others}
    >
      {local.children}
    </button>
  );
}
