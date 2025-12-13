'use client';
import React from 'react';
import { Input } from '../atoms/Input';

interface InputFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // ← 追加
  className?: string;
  label?: string; // 任意に変更
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  className,
}) => (
  <Input
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}   // ← ここ重要
    className={className}
  />
);
