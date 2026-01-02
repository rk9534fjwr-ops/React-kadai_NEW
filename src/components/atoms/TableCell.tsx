interface TableCellProps {
  children: React.ReactNode;
}

export const TableCell = ({ children }: TableCellProps) => (
  <td>{children}</td>
);