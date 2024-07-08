import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.signUp({ email, password })

  return NextResponse.json(user)
}