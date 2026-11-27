import { NextResponse } from "next/server";
import { dbGetUserByEmail } from "@/lib/db";

// Not used by the demo portal (which signs in through src/lib/services.ts).
// Before connecting the database: store passwords as salted hashes (bcrypt/argon2),
// compare with a constant-time check, and issue an httpOnly session cookie.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body ?? {};

    if (typeof identifier !== "string" || typeof password !== "string" || !identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Identifier (email or mobile) and password are required" },
        { status: 400 }
      );
    }

    const user = await dbGetUserByEmail(identifier.trim().toLowerCase());
    const stored = (user as { password?: string | null } | undefined)?.password;

    if (!user || !stored || stored !== password) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        college: user.college,
        status: user.status,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
