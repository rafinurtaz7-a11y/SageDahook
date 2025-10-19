import {NextResponse} from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://127.0.0.1:11434');
    if (response.status === 200) {
      return NextResponse.json({isRunning: true});
    } else {
      return NextResponse.json({isRunning: false});
    }
  } catch (error) {
    return NextResponse.json({isRunning: false});
  }
}
