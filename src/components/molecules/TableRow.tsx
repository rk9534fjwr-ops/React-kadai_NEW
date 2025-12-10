import React from 'react';
import { TableCell } from '../atoms/TableCell';

interface TableRowProps {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  age: number;
  sentStatus: '済' | '未';
  // ✅ チェックボックス用
  selected: boolean;
  onToggle: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  name,
  nameKana,
  phone,
  email,
  age,
  sentStatus,
  selected,
  onToggle,
}) => (
  <tr>
    {/* 左端：個別チェックボックス */}
    <TableCell>
      <input type="checkbox" checked={selected} onChange={onToggle} />
    </TableCell>

    <TableCell>
      {name}<br />
      <small>{nameKana}</small>
    </TableCell>
    <TableCell>{phone}</TableCell>
    <TableCell>{email}</TableCell>
    <TableCell>{age}</TableCell>
    <TableCell>{sentStatus}</TableCell>
  </tr>
);
