'use client';
import React from 'react';
import type { UserData } from '@/resources/types/UserData';
import styles from '../../resources/css/ConfirmSend.module.css';
import { TABLE_ITEM, BUTTON_ITEM } from '../../contents/messages';

interface ConfirmSendProps {
  users: UserData[];          // 検索結果全体
  onBack: () => void;
  onSend: () => void;
}

export const ConfirmSend: React.FC<ConfirmSendProps> = ({
  users,
  onBack,
  onSend,
}) => {
  
  const { HEADERS } = TABLE_ITEM;
  const { BUTTONS } = BUTTON_ITEM;

  return (
    <div>
      <h2>{BUTTONS.TITLE}</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>{HEADERS.NAME}</th>
            <th>{HEADERS.NAME_KANA}</th>
            <th>{HEADERS.PHONE}</th>
            <th>{HEADERS.EMAIL}</th>
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
        <button 
          onClick={onBack}
          className={styles.backButton}
        >
          {BUTTONS.BACK}
        </button>

        <button
          onClick={onSend}
          className={styles.sendButton}
        >
          {BUTTONS.SEND}
        </button>
      </div>
    </div>
  );
};
