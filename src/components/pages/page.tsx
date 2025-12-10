'use client';
import React, { useState } from 'react';
import { SearchForm } from '../organisms/SearchForm';
import { DataTable } from '../organisms/DataTable';
import type { SearchCriteria, UserData } from '@/resources/types/UserData';

const UserSearchTemplate: React.FC = () => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: '',
    nameKana: '',
    phone: '',
    email: '',
    filterUnsentOnly: false,
  });

  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true); // 読み込み中フラグ
  const [hasSearched, setHasSearched] = useState(false); // ← 検索実行済みフラグを追加

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

 // ✅ 検索ボタン押下時（API が絞り込み）
  const handleSearch = async (newCriteria: SearchCriteria) => {
    setCriteria(newCriteria);
    setHasSearched(true);
    setLoading(true);

    try {
      // 検索条件をクエリパラメータに付与
      const query =toQueryParams(newCriteria).toString();
      const res = await fetch(`/api/users?${query}`);

      if (!res.ok) {
        console.error('検索 API エラー');
        return;
      }

      const json = await res.json();
      setFilteredData(json.data); // ← API が絞り込んだデータをそのままセット
    } catch (error) {
      console.error('検索失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ クリアボタン押下時
  const handleClear = () => {
    const cleared: SearchCriteria = {
      name: '',
      nameKana: '',
      phone: '',
      email: '',
      filterUnsentOnly: false,
    };

    setCriteria(cleared);
    setFilteredData([]);
    setHasSearched(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>ユーザー一覧</h1>

      <SearchForm
        initialCriteria={criteria}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {/* ローディング中 */}
      {loading && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          検索中...
        </p>
      )}

      {/* 検索前は非表示 */}
      {!loading && !hasSearched && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#777' }}>
          検索条件を入力して「検索」を押してください。
        </p>
      )}

      {/* 検索後データ表示 */}
      {!loading && hasSearched && (
        <DataTable data={filteredData} />
      )}
    </div>
  );
};

export default UserSearchTemplate;