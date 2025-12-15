import { NextResponse } from 'next/server';

interface SendRequest {
  emails: string[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendRequest;

    // stub：ここで実際の送信処理はしない
    console.log('📨 送信 stub 呼び出し', body.emails);

    return NextResponse.json({
      status: 'success',
      sentCount: body.emails.length,
    });
  } catch (error) {
    console.error('送信 stub エラー:', error);
    return NextResponse.json(
      { status: 'error', message: '送信に失敗しました' },
      { status: 500 }
    );
  }
}
