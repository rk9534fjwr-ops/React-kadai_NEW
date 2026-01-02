import styles from '../../resources/css/DataTable.module.css';

interface SortableHeaderProps {
  label: string;
  active: boolean;
  ascending: boolean;
  onClick: () => void;
}

export const SortableHeader = ({ label, active, ascending, onClick }: SortableHeaderProps) => (
  <th onClick={onClick} className={styles.sortable}>
    {label} {active ? (ascending ? '▲' : '▼') : '▲▼'}
  </th>
);