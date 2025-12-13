'use client';
import React, { useState } from 'react';
import { SortableHeader } from '../atoms/SortableHeader';
import { TableRow } from '../molecules/TableRow';
import { PaginationControls } from '../molecules/PaginationControls';
import styles from '../../resources/css/DataTable.module.css';

interface UserData {
  name: string;
  nameKana: string;
  phone: string;
  email: string; // 一意IDとして使用
  age: number;
  sentStatus: '済' | '未';
}

interface DataTableProps {
  data: UserData[];
}

const ITEMS_PER_PAGE = 10;

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<'age' | 'sentStatus'>('age');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ チェックボックス用 state
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // ソート処理
  const sortedData = [...data].sort((a, b) => {
    const v1 = a[sortKey];
    const v2 = b[sortKey];
    if (v1 < v2) return sortAsc ? -1 : 1;
    if (v1 > v2) return sortAsc ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const handleSort = (key: 'age' | 'sentStatus') => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // ✅ 全選択チェックボックス
  const allSelected = pagedData.length > 0 && pagedData.every(d => selectedItems.includes(d.email));

  const handleToggleAll = () => {
  if (allSelected) {
    // 現在ページ分だけ解除
    setSelectedItems(prev =>
      prev.filter(
        key => !pagedData.some(d => d.email === key)
      )
    );
  } else {
    // 既存 + 現在ページ分を追加（重複防止）
    setSelectedItems(prev => [
      ...prev,
      ...pagedData
        .map(d => d.email)
        .filter(key => !prev.includes(key)),
    ]);
  }
};

const handleToggleItem = (key: string) => {
  if (selectedItems.includes(key)) {
    setSelectedItems(selectedItems.filter(i => i !== key));
  } else {
    setSelectedItems([...selectedItems, key]);
  }
};

  if (data.length === 0) {
    return <p className={styles.noData}>該当するデータがありません。</p>;
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* 左端：全選択チェックボックス */}
            <th>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleToggleAll}
              />
            </th>
            <th>氏名<br /><small>氏名カナ</small></th>
            <th>電話番号</th>
            <th>メールアドレス</th>
            <SortableHeader
              label="年齢"
              active={sortKey === 'age'}
              ascending={sortAsc}
              onClick={() => handleSort('age')}
            />
            <SortableHeader
              label="送信状況"
              active={sortKey === 'sentStatus'}
              ascending={sortAsc}
              onClick={() => handleSort('sentStatus')}
            />
          </tr>
        </thead>
        <tbody>
          {pagedData.map(d => (
            <TableRow
            key={d.email}        // ★ index を使わない
            {...d}
            selected={selectedItems.includes(d.email)}
            onToggle={() => handleToggleItem(d.email)}
          />
          ))}
        </tbody>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default DataTable;