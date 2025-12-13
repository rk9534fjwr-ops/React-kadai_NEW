'use client';
import React, { useState, useEffect } from 'react';
import { InputField } from '../molecules/InputField';
import { ButtonGroup } from '../molecules/ButtonGroup';
import { Checkbox } from '../atoms/Checkbox';
import styles from '../../resources/css/SearchForm.module.css';

interface SearchCriteria {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  filterUnsentOnly: boolean;
}

interface SearchFormProps {
  initialCriteria: SearchCriteria;
  onSearch: (criteria: SearchCriteria) => void;
  onClear: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  initialCriteria,
  onSearch,
  onClear,
}) => {
  const [form, setForm] = useState<SearchCriteria>(initialCriteria);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(initialCriteria);
  }, [initialCriteria]);

  // ✔ HTMLInputElement | HTMLSelectElement などを含めても OK
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target;

  // checkbox の場合
  if (target instanceof HTMLInputElement && target.type === 'checkbox') {
    setForm(prev => ({
      ...prev,
      [target.name]: target.checked,
    }));
    return;
  }

  // text / email / tel など通常の input または select
  setForm(prev => ({
    ...prev,
    [target.name]: target.value,
  }));
};

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (form.name.length > 10)
      newErrors.name = '氏名は10文字以内で入力してください。';

    if (form.nameKana && !/^[ァ-ヶー ]+$/.test(form.nameKana))
      newErrors.nameKana = '氏名カナは全角カタカナで入力してください。';

    if (form.phone && !/^[0-9-]+$/.test(form.phone))
      newErrors.phone = '電話番号は数字とハイフンのみ入力できます。';
    else if (form.phone.replace(/-/g, '').length > 11)
      newErrors.phone = '電話番号は11桁以内で入力してください。';

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'メールアドレスの形式が正しくありません。';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSearch = () => {
    if (validate()) onSearch(form);
};

const handleClear = () => {
    setForm({
      name: '',
      nameKana: '',
      phone: '',
      email: '',
      filterUnsentOnly: false,
    });
    setErrors({});
    onClear();
};

//入力欄のフォーカスアウト
const validateField = (field: keyof SearchCriteria) => {
  const newErrors = { ...errors };

  switch (field) {
    case 'name':
      if (form.name.length > 10)
        newErrors.name = '氏名は10文字以内で入力してください。';
      else delete newErrors.name;
      break;

    case 'nameKana':
      if (form.nameKana && !/^[ァ-ヶー ]+$/.test(form.nameKana))
        newErrors.nameKana = '氏名カナは全角カタカナで入力してください。';
      else delete newErrors.nameKana;
      break;

    case 'phone':
      if (form.phone && !/^[0-9-]+$/.test(form.phone))
        newErrors.phone = '電話番号は数字とハイフンのみ入力できます。';
      else if (form.phone.replace(/-/g, '').length > 11)
        newErrors.phone = '電話番号は11桁以内で入力してください。';
      else delete newErrors.phone;
      break;

    case 'email':
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        newErrors.email = 'メールアドレスの形式が正しくありません。';
      else delete newErrors.email;
      break;
  }

  setErrors(newErrors);
};

const handleBlur = (field: keyof SearchCriteria) => {
  validateField(field);
};

  // ✔ name の型を keyof SearchCriteria に固定し any を完全排除
  const renderInput = (
    id: string,
    name: keyof SearchCriteria,
    label: string,
    value: string
  ) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <label htmlFor={id}>{label}</label>
        <InputField
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}  // ← 追加
          className={styles.input}
        />
      </div>
      {errors[name] && (
        <span className={styles.errorText}>{errors[name]}</span>
      )}
    </div>
  );

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.row}>
        {renderInput('name', 'name', '氏名：', form.name)}
        {renderInput('nameKana', 'nameKana', '氏名カナ：', form.nameKana)}
      </div>

      <div className={styles.row}>
        {renderInput('phone', 'phone', '電話番号：', form.phone)}
        {renderInput('email', 'email', 'メールアドレス：', form.email)}
      </div>

      <Checkbox
        name="filterUnsentOnly"
        checked={form.filterUnsentOnly}
        onChange={handleChange}
        label="未でフィルタする"
        className={styles.checkboxLabel}
      />

      <ButtonGroup
        onSearch={handleSearch}
        onClear={handleClear}
        searchClass={styles.searchButton}
        clearClass={styles.clearButton}
      />
    </form>
  );
};