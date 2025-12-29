'use client';
import React from 'react';
import { Button } from '../atoms/SearchButton';
import styles from '../../resources/css/SearchForm.module.css';

interface ButtonGroupProps {
  onSearch: () => void;
  onClear: () => void;
  searchClass?: string;
  clearClass?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ onSearch, onClear, searchClass, clearClass }) => (
  <div className={styles.buttonGroup}>
    <Button onClick={onSearch} className={searchClass}>検索</Button>
    <Button onClick={onClear} className={clearClass}>検索解除</Button>
  </div>
);