import { JSX, splitProps } from 'solid-js';
import { IconProps } from './types';

export function createIconComponent(
  svgPaths: JSX.Element,
  defaultTitle = ''
) {
  return function IconComponent(props: IconProps) {
    const [local, others] = splitProps(props, ['size', 'color', 'title', 'class', 'classList']);
    
    const size = () => local.size ?? 24;
    const color = () => local.color ?? 'currentColor';
    const title = () => local.title ?? defaultTitle;
    
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        width={size()}
        height={size()}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color()}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden={!title()}
        role={title() ? 'img' : 'presentation'}
        class={local.class}
        classList={local.classList}
        {...others}
      >
        {title() && <title>{title()}</title>}
        {svgPaths}
      </svg>
    );
  };
}
