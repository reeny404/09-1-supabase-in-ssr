import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type loginInfo = { email: string, password: string };

export async function POST(request: NextRequest) {
  const { email, password }: loginInfo = await request.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.signInWithPassword({ email, password });
  return NextResponse.json(user);
}