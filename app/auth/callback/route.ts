import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");        // Supabase magic link
  const token_hash = searchParams.get("token_hash"); // OTP fallback
  const type = searchParams.get("type") ?? "email";

  const supabase = await createClient();

  try {
    // Handle magic link/email verification
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(
          request.url.replace(
            "/auth/callback",
            "/auth/login?message=email_verified"
          )
        );
      }
    }

    // Handle OTP verification fallback
    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      });

      if (!error) {
        return NextResponse.redirect(
          request.url.replace(
            "/auth/callback",
            "/auth/login?message=email_verified"
          )
        );
      }
    }

    // Fallback redirect on error
    return NextResponse.redirect(
      request.url.replace(
        "/auth/callback",
        "/auth/login?error=invalid_token"
      )
    );
  } catch (err) {
    console.error("Email verification error:", err);
    return NextResponse.redirect(
      request.url.replace(
        "/auth/callback",
        "/auth/login?error=verification_failed"
      )
    );
  }
}