import styles from '../../resources/css/SendComplete.module.css';

interface Props {
  count: number;
  onBack: () => void;
}

export const SendComplete: React.FC<Props> = ({ count, onBack }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <p>{count} 件のユーザーに送信が完了しました。</p>

      <button 
        className={styles.confirmButton}
        onClick={onBack}>
        検索画面へ戻る
      </button>
    </div>
  );
};