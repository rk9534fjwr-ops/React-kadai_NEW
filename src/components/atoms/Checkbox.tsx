interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

export const Checkbox = ({ name, checked, onChange, label, className }: CheckboxProps) => (
  <label className={className}>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    {label}
  </label>
);