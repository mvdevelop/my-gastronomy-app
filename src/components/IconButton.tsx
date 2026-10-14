import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

function IconButton({ label, children, type = 'button', ...props }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} {...props}>
      {children}
    </button>
  );
}

export default IconButton;
