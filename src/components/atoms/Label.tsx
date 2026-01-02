interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => (
  <label htmlFor={htmlFor}>{children}</label>
);