import React from 'react';
import { Button } from '../atoms/Button';
import styles from '../../resources/css/DataTable.module.css';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  // ページ移動ハンドラ
  const goFirst = () => onPageChange(1);
  const goPrev = () => onPageChange(currentPage - 1);
  const goNext = () => onPageChange(currentPage + 1);
  const goLast = () => onPageChange(totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={styles.pagination}>
      <Button onClick={goFirst} disabled={isFirstPage}>
        先頭ページ
      </Button>
      <Button onClick={goPrev} disabled={isFirstPage}>
        前ページ
      </Button>
      <Button onClick={goNext} disabled={isLastPage}>
        次ページ
      </Button>
      <Button onClick={goLast} disabled={isLastPage}>
        最終ページ
      </Button>
    </div>
  );
};