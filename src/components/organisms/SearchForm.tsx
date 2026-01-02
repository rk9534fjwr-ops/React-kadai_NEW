import { useState, useEffect } from 'react';
import { InputField } from '../molecules/InputField';
import { ButtonGroup } from '../molecules/ButtonGroup';
import styles from '../../resources/css/SearchForm.module.css';
import type { SearchCriteria } from '@/resources/types/UserData';
import { TABLE_ITEM, SEARCH_FORM_ERRORS, SEARCH_FORM_RULES } from '../../contents/messages';

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
  const [errors, setErrors] = useState<Partial<Record<keyof SearchCriteria, string>>>({});

  useEffect(() => {
    setForm(initialCriteria);
  }, [initialCriteria]);

  // 入力変更
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    // checkbox の場合
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [target.name]: target.checked,
      }));
      return;
    }

    // text / email / tel / select
    setForm(prev => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  // 全体バリデーション（検索時）
  const validate = () => {
    const newErrors: Partial<Record<keyof SearchCriteria, string>> = {};

    if (form.name.length > SEARCH_FORM_RULES.NAME_MAX_LENGTH){
      newErrors.name = SEARCH_FORM_ERRORS.NAME_MAX_LENGTH;
    }

    if (form.nameKana && !SEARCH_FORM_RULES.NAME_KANA_REGEX.test(form.nameKana)){
      newErrors.nameKana = SEARCH_FORM_ERRORS.NAME_KANA_FORMAT;
    }

    if (form.phone && !SEARCH_FORM_RULES.PHONE_REGEX.test(form.phone)){
      newErrors.phone = SEARCH_FORM_ERRORS.PHONE_FORMAT;
    } else if (form.phone.replace(/-/g, '').length > SEARCH_FORM_RULES.PHONE_MAX_LENGTH){
      newErrors.phone = SEARCH_FORM_ERRORS.PHONE_LENGTH;
    }

    if (form.email && !SEARCH_FORM_RULES.EMAIL_REGEX.test(form.email)){
      newErrors.email = SEARCH_FORM_ERRORS.EMAIL_FORMAT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (validate()) {
      onSearch(form);
    }
  };

  const handleClear = () => {
    setForm(initialCriteria);
    setErrors({});
    onClear();
  };

  //入力欄のフォーカスアウト
  const validateField = (field: keyof SearchCriteria) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (form.name.length > SEARCH_FORM_RULES.NAME_MAX_LENGTH){
        newErrors.name = SEARCH_FORM_ERRORS.NAME_MAX_LENGTH;
        } else {
          delete newErrors.name;
        } 
        break;

      case 'nameKana':
        if (form.nameKana && !SEARCH_FORM_RULES.NAME_KANA_REGEX.test(form.nameKana)){
          newErrors.nameKana = SEARCH_FORM_ERRORS.NAME_KANA_FORMAT;
        } else {
          delete newErrors.nameKana;
        }
        break;

      case 'phone':
        if (form.phone && !SEARCH_FORM_RULES.PHONE_REGEX.test(form.phone)){
          newErrors.phone = SEARCH_FORM_ERRORS.PHONE_FORMAT;
        } else if (form.phone.replace(/-/g, '').length > SEARCH_FORM_RULES.PHONE_MAX_LENGTH){
          newErrors.phone = SEARCH_FORM_ERRORS.PHONE_LENGTH;
        } else {
          delete newErrors.phone;
        }
        break;

      case 'email':
      if (
        form.email && !SEARCH_FORM_RULES.EMAIL_REGEX.test(form.email)
      ) {
        newErrors.email = SEARCH_FORM_ERRORS.EMAIL_FORMAT;
      } else {
        delete newErrors.email;
      }
      break;
    }

    setErrors(newErrors);
  };

  const handleBlur = (field: keyof SearchCriteria) => {
    validateField(field);
  };

  // name の型を keyof SearchCriteria に固定し any を完全排除
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
          onBlur={() => handleBlur(name)}  // 追加
          className={styles.input}
        />
      </div>
      {errors[name] && (
        <span className={styles.errorText}>{errors[name]}</span>
      )}
    </div>
  );

  return (
    <form 
      className={styles.form} 
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.row}>
        {renderInput('name', 'name', TABLE_ITEM.HEADERS.NAME, form.name)}
        {renderInput('nameKana', 'nameKana', TABLE_ITEM.HEADERS.NAME_KANA, form.nameKana)}
      </div>

      <div className={styles.row}>
        {renderInput('phone', 'phone', TABLE_ITEM.HEADERS.PHONE, form.phone)}
        {renderInput('email', 'email',  TABLE_ITEM.HEADERS.EMAIL, form.email)}
      </div>

      <ButtonGroup
        onSearch={handleSearch}
        onClear={handleClear}
      />
    </form>
  );
};