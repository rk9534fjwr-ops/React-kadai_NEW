interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // ← 追加
  className?: string;
}

export const Input = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  className,
}: InputProps) => (
  <input
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}   // ← 追加
    className={className}
  />
);