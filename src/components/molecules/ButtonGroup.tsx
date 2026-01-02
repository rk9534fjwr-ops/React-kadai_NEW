import React from 'react';
import { Button } from '../atoms/SearchButton';
import styles from '../../resources/css/SearchForm.module.css';

interface ButtonGroupProps {
  onSearch: () => void;
  onClear: () => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ onSearch, onClear}) => (
  <div className={styles.buttonGroup}>
    <Button onClick={onSearch} className={styles.searchButton}>検索</Button>
    <Button onClick={onClear} className={styles.clearButton}>検索解除</Button>
  </div>
);