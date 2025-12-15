'use client';
import React, { useState } from 'react';
import { SearchForm } from '../organisms/SearchForm';
import { DataTable } from '../organisms/DataTable';
import { ConfirmSend } from '../organisms/ConfirmSend';
import type { SearchCriteria, UserData } from '@/resources/types/UserData';
import { SendComplete } from '../organisms/SendComplete';

const UserSearchTemplate: React.FC = () => {
  //送信完了画面
const [mode, setMode] =
  useState<'search' | 'confirm' | 'complete'>('search');

  // 🔹 検索条件
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: '',
    nameKana: '',
    phone: '',
    email: '',
    filterUnsentOnly: false,
  });

  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  // ✅ 検索解除状態に戻す共通関数
  const resetToInitial = () => {
    setCriteria({
      name: '',
      nameKana: '',
      phone: '',
      email: '',
      filterUnsentOnly: false,
    });
    setFilteredData([]);
    setHasSearched(false);
    setSelectedEmails([]);
    setMode('search');
  };

   // 🔹 検索
  const handleSearch = async (newCriteria: SearchCriteria) => {
    setCriteria(newCriteria);
    setHasSearched(true);
    setLoading(true);

  const toQueryParams = (criteria: SearchCriteria): string => {
  const params = new URLSearchParams();
  Object.entries(criteria).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      params.append(key, value ? 'true' : 'false');
    }
    if (typeof value === 'string' && value.trim() !== '') {
      params.append(key, value);
    }
  });
  return params.toString();
};

    try {
      const query = toQueryParams(newCriteria);
      const res = await fetch(`/api/users?${query}`);
      const json = await res.json();
      setFilteredData(json.data);
    } finally {
    setLoading(false);
  }
  };

const selectedUsers = filteredData.filter(u =>
    selectedEmails.includes(u.email)
  );

 // 🔹 送信
const handleSend = async () => {
  try {
    await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails: selectedEmails }),
    });

    // ✅ 完了画面へ
    setMode('complete');
  } catch (error) {
    console.error('送信失敗:', error);
  }
};

    return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>ユーザー一覧</h1>

      {mode === 'search' && (
        <>
        <SearchForm
            initialCriteria={criteria}
            onSearch={handleSearch}
            onClear={resetToInitial}
        />

        {loading && (
  <p style={{ textAlign: 'center', marginTop: '20px' }}>
    検索中...
  </p>
)}

        {hasSearched && (
            <DataTable
              data={filteredData}
              selectedEmails={selectedEmails}
              onChangeSelected={setSelectedEmails}
              onConfirm={() => setMode('confirm')}
            />
        )}
      </>
    )}

      {mode === 'confirm' && (
        <ConfirmSend
          users={selectedUsers}
          onBack={() => setMode('search')}
          onSend={handleSend}
        />
      )}

      {mode === 'complete' && (
        <SendComplete
          count={selectedEmails.length}
          onBack={resetToInitial}
        />
      )}
    </div>
  );
};

export default UserSearchTemplate;
