'use client';
import React from 'react';
import type { UserData } from '@/resources/types/UserData';
import styles from '../../resources/css/ConfirmSend.module.css';

interface ConfirmSendProps {
  users: UserData[];          // 検索結果全体
  selectedEmails: string[];   // 選択されたメール一覧
  onBack: () => void;
  onSend: () => void;
}

export const ConfirmSend: React.FC<ConfirmSendProps> = ({
  users,
  selectedEmails,
  onBack,
  onSend,
}) => {
  // ConfirmSend 側で選択ユーザーを抽出
  const selectedUsers = users.filter(user =>
    selectedEmails.includes(user.email)
  );
  
  return (
    <div>
      <h2>送信確認</h2>

      {selectedUsers.length === 0 ? (
        <p>送信対象のユーザーが選択されていません。</p>
      ) : (

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
      )}
      
      <div className={styles.confirmWrapper}>
        <button 
          onClick={onBack}
          className={styles.confirmButton}
        >
          戻る
        </button>

        <button
          onClick={onSend}
          className={styles.confirmButton}
          disabled={selectedUsers.length === 0}
        >
          送信
        </button>
      </div>
    </div>
  );
};
