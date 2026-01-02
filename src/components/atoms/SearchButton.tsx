interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ type = 'button', onClick, className, children }: ButtonProps) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
);