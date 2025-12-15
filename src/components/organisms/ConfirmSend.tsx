'use client';
import React from 'react';
import type { UserData } from '@/resources/types/UserData';
import styles from '../../resources/css/ConfirmSend.module.css';

interface ConfirmSendProps {
  users: UserData[];
  onBack: () => void;
  onSend: () => void;
}

export const ConfirmSend: React.FC<ConfirmSendProps> = ({
  users,
  onBack,
  onSend,
}) => {
  return (
    <div>
      <h2>送信確認</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>氏名</th>
            <th>氏名カナ</th>
            <th>電話番号</th>
            <th>メール</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.nameKana}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.confirmWrapper}>
        <button onClick={onBack}
                className={styles.confirmButton}
        >
            戻る</button>
        <button
          onClick={onSend}
          className={styles.confirmButton}
        >
            送信
        </button>
      </div>
    </div>
  );
};
