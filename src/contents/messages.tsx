export const TABLE_ITEM = {
  HEADERS: {
    NAME: '氏名',
    NAME_KANA: '氏名カナ',
    PHONE: '電話番号',
    EMAIL: 'メールアドレス',
    AGE: '年齢',
    SENT_STATUS: '送信状況',
    },
} as const;

export const BUTTON_ITEM = {
  BUTTONS: {
    TITLE: '送信確認',
    BACK: '戻る',
    SEND: '送信',
    CONFIRM: '確認',
  },
} as const;

export const DATA_TABLE_CONFIG = {
  ITEMS_PER_PAGE: 10,
} as const;

export const SEARCH_FORM_ERRORS = {
  NAME_MAX_LENGTH: '氏名は10文字以内で入力してください。',
  NAME_KANA_FORMAT: '氏名カナは全角カタカナで入力してください。',
  PHONE_FORMAT: '電話番号は数字とハイフンのみ入力できます。',
  PHONE_LENGTH: '電話番号は11桁以内で入力してください。',
  EMAIL_FORMAT: 'メールアドレスの形式が正しくありません。',
} as const;

export const SEARCH_FORM_RULES = {
  NAME_MAX_LENGTH: 10,
  PHONE_MAX_LENGTH: 11,
  NAME_KANA_REGEX: new RegExp('^[ァ-ヶー ]+$'),
  PHONE_REGEX: new RegExp('^[0-9-]+$'),
  EMAIL_REGEX: new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
} as const;