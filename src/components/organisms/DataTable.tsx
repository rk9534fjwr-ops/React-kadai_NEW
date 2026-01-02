import { useState } from 'react';
import { SortableHeader } from '../atoms/SortableHeader';
import { TableRow } from '../molecules/TableRow';
import { PaginationControls } from '../molecules/PaginationControls';
import styles from '../../resources/css/DataTable.module.css';
import type { UserData } from '@/resources/types/UserData';
import { TABLE_ITEM, BUTTON_ITEM, DATA_TABLE_CONFIG } from '../../contents/messages';

//DataTable に props を追加
interface DataTableProps {
  data: UserData[];
  selectedEmails: string[];
  onChangeSelected: (emails: string[]) => void;
  onConfirm: () => void; // ← 確認ボタン用
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  selectedEmails,
  onChangeSelected,
  onConfirm,
}) => {
  const [sortKey, setSortKey] = useState<'age' | 'sentStatus'>('age');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { ITEMS_PER_PAGE } = DATA_TABLE_CONFIG;
  const { HEADERS } = TABLE_ITEM;
  const { BUTTONS } = BUTTON_ITEM;

// ソート
const sortedData = [...data].sort((a, b) => {
  const v1 = a[sortKey];
  const v2 = b[sortKey];

  if (v1 < v2) return sortAsc ? -1 : 1;
  if (v1 > v2) return sortAsc ? 1 : -1;
  return 0;
});

// ページング
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const pagedData = sortedData.slice(
  startIndex, 
  startIndex + ITEMS_PER_PAGE
);
const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

const handleSort = (key: 'age' | 'sentStatus') => {
  if (sortKey === key) {
    setSortAsc(!sortAsc);
  } else {
    setSortKey(key);
    setSortAsc(true);
  }
};

// 全選択チェックボックス
const allSelected =
  pagedData.length > 0 &&
  pagedData.every(d => selectedEmails.includes(d.email));

const handleToggleAll = () => {
  if (allSelected) {
    onChangeSelected(
      selectedEmails.filter(
        email => !pagedData.some(d => d.email === email)
      )
    );
  } else {
    const newOnes = pagedData
      .map(d => d.email)
      .filter(email => !selectedEmails.includes(email));

    onChangeSelected([...selectedEmails, ...newOnes]);
  }
};

const handleToggleItem = (email: string) => {
  if (selectedEmails.includes(email)) {
    onChangeSelected(selectedEmails.filter(e => e !== email));
  } else {
    onChangeSelected([...selectedEmails, email]);
  }
};

  return (
    <div className={styles.tableWrapper}>
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

            <th>
               {HEADERS.NAME}
              <br />
              <small>{HEADERS.NAME_KANA}</small>
            </th>

            <th>{HEADERS.PHONE}</th>
            <th>{HEADERS.EMAIL}</th>

            <SortableHeader
              label={HEADERS.AGE}
              active={sortKey === 'age'}
              ascending={sortAsc}
              onClick={() => handleSort('age')}
            />

            <SortableHeader
              label={HEADERS.AGE}
              active={sortKey === 'sentStatus'}
              ascending={sortAsc}
              onClick={() => handleSort('sentStatus')}
            />
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {pagedData.map(d => (
            <TableRow
              key={d.email} // ★ index を使わない
              {...d}
              selected={selectedEmails.includes(d.email)}
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

      <div className={styles.confirmWrapper}>
        <button
          className={styles.confirmButton}
          disabled={selectedEmails.length === 0}
          onClick={onConfirm}
        >
          {BUTTONS.CONFIRM}
        </button>
      </div>
    </div>
  );
};

export default DataTable;